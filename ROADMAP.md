# Roadmap

This roadmap is directional, not a delivery promise. The project is maintained as a hobby project.

## Current foundation

- Requirements discovery and durable environment memory
- AI rules, skills, recipes, registries, and context budget
- Provider documentation registration and on-demand activation
- Svelte 5 NUI workflow and browser debug helpers
- CI validation and deployable release packaging

## Next priorities

### Lua type safety

- Add Lua Language Server configuration.
- Define FiveM globals and runtime libraries.
- Establish EmmyLua/LuaLS annotation conventions.
- Add static diagnostics to CI without forcing excessive annotations on simple code.

### Development hot reload

- Keep Vite HMR for browser development.
- Research an optional in-game NUI development mode that points to the Vite server safely.
- Document resource restart boundaries; Lua runtime code will still require restart unless a safe reload mechanism is explicitly designed.

### Localization

- Add an optional, provider-neutral i18n contract.
- Support Lua and Svelte locale keys from one documented schema.
- Add fallback locale, placeholder validation, and missing-key CI checks.
- Do not load the i18n runtime into single-language resources unless selected.

### Developer experience

- Improve issue and pull request templates.
- Add more executable validators only when they prevent demonstrated mistakes.
- Add working examples without turning examples into runtime dependencies.

## Later possibilities

- Verified ESX, QBCore, and Qbox adapters based on real tests.
- Verified database and custom-resource providers.
- Optional asset optimization tooling.
- Expanded release artifact generation.

The project intentionally avoids speculative bridges, large dependency bundles, and features that have no verified use case.
