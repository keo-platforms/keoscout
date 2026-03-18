const PLUGIN_KEY = "plugin.inlang.railsYaml"

function parseScalar(rawValue) {
  if (
    (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
    (rawValue.startsWith("'") && rawValue.endsWith("'"))
  ) {
    return rawValue.slice(1, -1)
  }

  return rawValue
}

function parseSimpleYaml(yamlText, filePath) {
  const root = {}
  const stack = [{ indent: -1, object: root }]

  for (const [index, line] of yamlText.split("\n").entries()) {
    const trimmed = line.trim()
    if (trimmed.length === 0 || trimmed.startsWith("#")) {
      continue
    }

    const match = line.match(/^(\s*)([^:]+):(.*)$/)
    if (!match) {
      throw new Error(`Invalid YAML in ${filePath} at line ${index + 1}: ${line}`)
    }

    const indent = match[1].length
    const key = match[2].trim()
    const rawValue = match[3].trim()

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop()
    }

    const parent = stack[stack.length - 1].object

    if (rawValue.length === 0) {
      const nested = {}
      parent[key] = nested
      stack.push({ indent, object: nested })
    } else {
      parent[key] = parseScalar(rawValue)
    }
  }

  return root
}

function parsePattern(pattern) {
  const regex = /%\{([^}]+)\}|\{([^}]+)\}/g
  let match
  let lastIndex = 0
  const parts = []

  while ((match = regex.exec(pattern)) !== null) {
    const textBefore = pattern.slice(lastIndex, match.index)
    if (textBefore.length > 0) {
      parts.push({ type: "Text", value: textBefore })
    }

    parts.push({ type: "VariableReference", name: match[1] ?? match[2] })
    lastIndex = match.index + match[0].length
  }

  const textAfter = pattern.slice(lastIndex)
  if (textAfter.length > 0) {
    parts.push({ type: "Text", value: textAfter })
  }

  return parts
}

function flattenTranslations({ value, prefix, languageTag, filePath, output }) {
  if (typeof value === "string") {
    output.set(prefix, value)
    return
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, childValue] of Object.entries(value)) {
      const nextPrefix = prefix ? `${prefix}.${key}` : key
      flattenTranslations({
        value: childValue,
        prefix: nextPrefix,
        languageTag,
        filePath,
        output,
      })
    }
    return
  }

  throw new Error(
    `Unsupported translation value in ${filePath} for locale "${languageTag}" at key "${prefix}". Only string leaves are supported.`
  )
}

function resolvePathPattern(pathPattern, languageTag) {
  return pathPattern
    .replaceAll("{languageTag}", languageTag)
    .replaceAll("{locale}", languageTag)
}

const plugin = {
  id: PLUGIN_KEY,
  key: PLUGIN_KEY,
  displayName: "Rails YAML",
  description: "Load translations from Rails locale YAML files.",
  settingsSchema: {
    type: "object",
    properties: {
      pathPattern: {
        type: "string",
        title: "Path to Rails locale files",
        description:
          "Path pattern for locale files, e.g. ./config/locales/{locale}.yml",
      },
    },
    required: ["pathPattern"],
    additionalProperties: false,
  },

  loadMessages: async ({ settings, nodeishFs }) => {
    const pluginSettings = settings[PLUGIN_KEY] ?? {}
    const pathPattern =
      pluginSettings.pathPattern ?? "./config/locales/{locale}.yml"
    const languageTags = settings.locales ?? settings.languageTags ?? []

    if (!Array.isArray(languageTags) || languageTags.length === 0) {
      throw new Error(
        "No locales configured. Set locales in project.inlang/settings.json."
      )
    }

    const byMessageId = new Map()

    for (const languageTag of languageTags) {
      const filePath = resolvePathPattern(pathPattern, languageTag)
      const fileContent = await nodeishFs
        .readFile(filePath, { encoding: "utf-8" })
        .catch((error) => {
          if (error?.code === "ENOENT") {
            throw new Error(
              `Missing locale file for "${languageTag}": ${filePath}. Ensure every configured locale has a Rails YAML file.`
            )
          }
          throw error
        })

      const parsed = parseSimpleYaml(fileContent, filePath)
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error(
          `Locale file ${filePath} does not contain a YAML object at the top level.`
        )
      }

      const localeRoot =
        parsed[languageTag] &&
        typeof parsed[languageTag] === "object" &&
        !Array.isArray(parsed[languageTag])
          ? parsed[languageTag]
          : parsed

      const flattened = new Map()
      flattenTranslations({
        value: localeRoot,
        prefix: "",
        languageTag,
        filePath,
        output: flattened,
      })

      for (const [id, text] of flattened.entries()) {
        if (id.length === 0) continue

        const existing = byMessageId.get(id) ?? {
          id,
          alias: {},
          selectors: [],
          variants: [],
        }

        existing.variants.push({
          languageTag,
          match: [],
          pattern: parsePattern(text),
        })

        byMessageId.set(id, existing)
      }
    }

    return [...byMessageId.values()]
  },

  // saveMessages is required for the SDK to treat this as a legacy load/save plugin.
  // Rails YAML is read-only; writes are no-ops.
  saveMessages: async () => {},
}

export default plugin
