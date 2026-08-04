# ADR-001: Configuration Architecture

Status: Approved

## Decision
- `resource/config/config.main.lua` is the editable configuration foundation and loads first.
- Small domain configs may live at the config root, for example `resource/config/config.item.lua`.
- Large domains use folders, for example `resource/config/shop/24.7_store.lua`.
- Do not create `resource/config/shared/`, `resource/config/client/`, or `resource/config/server/`.
- Executable helpers belong to their runtime, for example `resource/shared/lib/config.lua`, `resource/client/lib/config.lua`, or `resource/server/lib/config.lua`.
- Gameplay/business logic must not live in config helper files.
- Root config files with ordering requirements are listed explicitly in `resource/fxmanifest.lua`.
- Nested domain files may use globs when no internal ordering dependency exists.
- Secrets and privileged validation config are server-only.

## Rationale
This keeps editable values easy to find without mixing runtime behavior into configuration or duplicating client/server/shared config trees.
