# Code Style

## General
- Prefer small cohesive files and explicit runtime boundaries.
- Comments explain intent, constraints, or risk—not obvious syntax.
- Avoid speculative abstractions and unused extension points.
- Keep public contracts stable and documented.

## Lua
- Prefer locals; avoid mutable globals except approved namespaces such as `Config`.
- Validate early and return consistent error codes.
- Keep event handlers thin and move business logic into modules/services.
- Use adaptive waits and bounded caches; clean up handles and pending work.
- `main.lua` only coordinates initialization and shutdown.

## Svelte/JavaScript
- Separate NUI transport, state, and presentation.
- Reuse components and tokens before creating variants.
- Use semantic elements and explicit accessible labels.
- Avoid inline style duplication and broad global overrides.
- Clean up listeners, timers, subscriptions, and focus traps.

## Changes
- Make the smallest complete change.
- Do not reformat unrelated files.
- Update registries, specifications, and tests with the implementation.
