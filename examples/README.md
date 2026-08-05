# Executable Examples

Examples are standalone FiveM resources and are never loaded by `resource/fxmanifest.lua` or release packages.

| Example | Teaches | Required capabilities |
|---|---|---|
| `hello-world/` | client intent, string action enum, server validation, rate limiting, correlation IDs, targeted response | none |
| `shop-system/` | config, bounded idempotency, NUI deadlines, server authority, transactional repository boundary, cleanup | none by default |

Copy or junction only the selected example into an FXServer resources category, then follow that example's README. AI should read this index and one selected example only; it must not load all examples or optional capability packs by default.

The older `resources/example_interaction/` remains a compact reference fixture. Prefer the two executable examples for learning complete flows.
