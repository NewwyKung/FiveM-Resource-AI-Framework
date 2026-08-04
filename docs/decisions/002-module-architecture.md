# ADR-002: Module Architecture and Loading

Status: Approved

## Decision
- `resource/shared/lib/` contains reusable utilities safe for both runtimes.
- `resource/shared/modules/` contains shared domain definitions and behavior.
- `resource/client/modules/` contains client-only behavior.
- `resource/server/modules/` contains server-only behavior.
- One module should own one clear responsibility.
- `resource/client/main.lua` and `resource/server/main.lua` are bootstrap entrypoints loaded last.
- Business logic does not belong in `main.lua`.
- `resource/fxmanifest.lua` is the load-order authority; no custom loader is introduced by default.
- Wildcard alphabetical order must not be treated as a dependency mechanism.
- Real dependencies are listed explicitly before dependent modules.
- Cross-runtime communication uses documented events, callbacks, exports, or state bags.

## Approved load order
Shared foundation/config -> shared libraries -> shared modules -> runtime config -> runtime modules -> runtime `main.lua`.
