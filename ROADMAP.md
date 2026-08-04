# Roadmap

This roadmap is directional, not a delivery promise. The project is maintained as a hobby project.

## Current foundation

- Requirements discovery and durable environment memory
- AI rules, skills, recipes, registries, and context budget
- Provider documentation registration and on-demand activation
- Svelte 5 NUI workflow and browser debug helpers
- CI validation and deployable release packaging
- Lua Language Server configuration and FiveM type definitions
- Lua annotation practice for public contracts and untrusted boundaries
- Resilient NUI callbacks with timeout, cancellation, bounded pending requests, and structured errors
- Lightweight Svelte 5 feature-state lifecycle
- Optional i18n capability pack
- Optional forward-only database migration guidance
- Optional FXServer runtime-test harness

## Next priorities

### Type diagnostics

- Expand FiveM native definitions only when real resource work requires them.
- Add provider-specific type definitions only for activated providers.
- Add stable LuaLS CLI diagnostics to CI when a reproducible runner is selected.

### Runtime tests

- Add a complete `fxmanifest.lua` and example test registration for the opt-in harness.
- Document headless/development FXServer setup.
- Add CI runtime execution only when server artifacts and licensing can be configured reliably.

### Localization

- Add NUI translation store and locale-key validator.
- Add placeholder consistency and missing-key validation.
- Keep the runtime optional for single-language resources.

### Database migrations

- Add a provider-neutral migration runner contract.
- Add a memory driver test fixture.
- Add an oxmysql implementation only after oxmysql is activated and tested.

### Developer experience

- Add targeted validators only when they prevent demonstrated mistakes.
- Expand working examples without turning them into default runtime dependencies.
- Improve in-game NUI development guidance while retaining normal resource restart for Lua.

## Later possibilities

- Verified ESX, QBCore, and Qbox adapters based on real tests.
- Verified database and custom-resource providers.
- Optional asset optimization tooling.
- Expanded release artifact generation.

Lua hot reload is intentionally out of scope. The project favors restart-safe lifecycle behavior over dynamic Lua module reloading.

The project intentionally avoids speculative bridges, large dependency bundles, and features that have no verified use case.
