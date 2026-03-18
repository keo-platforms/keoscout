# inlang-plugin-rails-yaml

An [Inlang](https://inlang.com) plugin that reads translations directly from Rails locale YAML files, making Rails the single source of truth for your Paraglide JS translations.

## Installation

```bash
npm install inlang-plugin-rails-yaml
```

## Usage

In `project.inlang/settings.json`:

```json
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "vn"],
  "modules": [
    "./node_modules/inlang-plugin-rails-yaml/index.js"
  ],
  "plugin.inlang.railsYaml": {
    "pathPattern": "./config/locales/{locale}.yml"
  }
}
```

## Path pattern

The `pathPattern` setting supports two placeholders:

- `{locale}` — replaced with the locale tag (e.g. `en`, `vn`)
- `{languageTag}` — alias for `{locale}`

Default: `./config/locales/{locale}.yml`

## Rails YAML format

Standard nested Rails locale files are supported:

```yaml
en:
  app:
    title: My App
  users:
    greeting: Hello, %{name}!
```

Keys are flattened with dots: `app.title`, `users.greeting`.

In Svelte (or any JS):

```js
import * as m from '../i18n/messages.js'

m["app.title"]()           // → "My App"
m["users.greeting"]({ name: "Alice" })  // → "Hello, Alice!"
```

## Notes

- Rails YAML files are **read-only** — the plugin does not write back to your locale files.
- Only string leaf values are supported (no arrays, pluralization rules, etc.).
- Rails-style `%{varname}` interpolation is converted to Paraglide variable references.
- `{varname}` is also accepted for compatibility, but Rails YAML should prefer `%{varname}`.
