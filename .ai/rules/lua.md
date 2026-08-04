# Lua Rules

- Target Lua 5.4 supported by FiveM.
- Prefer local variables/functions; avoid accidental globals.
- Keep one module focused on one responsibility.
- `main.lua` initializes modules; it should not hold feature logic.
- Utilities reusable by both runtimes belong in `shared/lib/`.
- Do not depend on alphabetical wildcard order. Explicitly order real dependencies.
- Cache stable native results where safe; never cache volatile entity state blindly.
- Bound caches, queues, pending callbacks, and history tables.
- Use protected calls only at external/error boundaries, not to hide programming errors.
- Validate types and ranges before business logic.
- Release requested models, animation dictionaries, scaleforms, and entities.
- Prefer early returns and consistent error codes.
