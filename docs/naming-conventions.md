# Naming Conventions

## Files
- Lua: lowercase dot-separated domains where useful, e.g. `config.item.lua`; feature modules use clear lowercase names.
- Svelte components: `PascalCase.svelte`.
- Documentation: lowercase kebab-case Markdown.

## Lua
- Locals/functions: `camelCase` unless an existing module uses another consistent convention.
- Module/namespace tables: `PascalCase`.
- Constants: `UPPER_SNAKE_CASE` only for true constants.
- Boolean names: `is`, `has`, `can`, or `should` prefix.

## Contracts
- Network event: `<resource>:server:<action>` or `<resource>:client:<action>`.
- NUI action: stable uppercase action or established project convention; do not mix conventions inside one resource.
- Export: descriptive `PascalCase` verb phrase.
- Error code: `UPPER_SNAKE_CASE`.
- State bag key: short, namespaced when collision is plausible.

## UI
- CSS custom properties: semantic kebab-case, e.g. `--color-surface-selected`.
- CSS classes: component-local descriptive kebab-case.
- Avoid names based only on current color or screen position.
