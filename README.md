# KeoScout

KeoScout is an open-source multi-lingual content monetization platform. It allows content creators to monetize their work through subscriptions, pay-per-view, and other revenue streams. The platform supports multiple languages, making it accessible a global audiences.

## i18n

- Rails locale files in `config/locales/{locale}.yml` are the source of truth.
- Paraglide messages are generated from Rails YAML via the `inlang-plugin-rails-yaml` npm package.
- The active frontend locales in `project.inlang/settings.json` are `en` and `vn`.

### Compile messages

After editing any Rails locale file, recompile the frontend messages:

```bash
npm run i18n:compile
```

Generated files are written to `app/frontend/i18n/messages/` using the locale module structure:

- `app/frontend/i18n/messages/en.js`
- `app/frontend/i18n/messages/vn.js`
- `app/frontend/i18n/messages/_index.js`

The frontend imports messages from `app/frontend/i18n/messages.js`.

If you are running the Vite dev server, the Paraglide Vite plugin will also generate the message files during frontend builds.

## Copyright

Copyright (c) 2026 Keo Platforms, LLC. All rights reserved.
