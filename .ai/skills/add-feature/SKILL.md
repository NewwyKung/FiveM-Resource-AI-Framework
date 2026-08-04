---
name: add-feature
description: Add one cohesive feature to an existing FiveM resource.
---

# Add Feature

## Read
- matching domain rules
- current module/config decisions
- affected API contracts

## Workflow
1. Trace the current data flow and ownership.
2. Decide whether the feature belongs in config, shared, client, server, or UI.
3. Reuse existing modules and helpers.
4. Add the smallest focused module(s).
5. Validate client input on the server.
6. Update manifest only when new load paths are required.
7. Add tests for normal, invalid, and cleanup paths.
8. Update API/docs only when contracts changed.

## Guardrails
- no unrelated refactor
- no business logic in `main.lua`
- no hidden custom loader
- no new dependency without justification
