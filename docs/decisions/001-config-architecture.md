# ADR-001: Configuration Architecture

Status: Approved

## Decision
- `config/config.main.lua` is the configuration foundation and loads first.
- Small domain configs may live at root, for example `config/config.item.lua`.
- Large domains use folders, for example `config/shop/24.7_store.lua`.
- Runtime-specific config lives in `config/shared/`, `config/client/`, or `config/server/`.
- Config-related helpers live in:
  - `config/functions/config.functions.shared.lua`
  - `config/functions/config.functions.client.lua`
  - `config/functions/config.functions.server.lua`
- Gameplay/business logic must not live in config helper files.
- Root config files with ordering requirements are listed explicitly in `fxmanifest.lua`.
- Nested domain files may use globs when no internal ordering dependency exists.
- Secrets and privileged validation config are server-only.

## Rationale
This keeps simple resources easy to edit while allowing large configuration sets to scale without turning `config.main.lua` into a monolith.
