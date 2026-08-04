---
name: add-feature
description: Add one approved cohesive feature to an existing FiveM resource. Run discover-requirements first when behavior or scope is unclear.
---

# Add Feature

## Required input
- approved `.ai/memory/requirements/<feature>.md`, or an existing approved feature registry that fully defines the change
- current `.ai/features/<feature>.md`

A request such as “add a shop system” is not sufficient by itself. Use `discover-requirements` to define behavior, UI, authority, data, configuration, integrations, failures, and acceptance criteria before implementation.

## Read
- approved requirements and matching feature registry
- matching domain rules
- current module/config decisions
- affected API, event, database, component, and UI contracts

## Workflow
1. Verify approval and compare requested behavior with current implementation.
2. Trace the current data flow and ownership.
3. Decide whether each responsibility belongs in config, shared, client, server, database, or UI according to the approved brief.
4. Reuse existing modules and helpers.
5. Add the smallest focused module(s).
6. Validate all client-controlled input on the server.
7. Update manifest only when new load paths are required.
8. Add tests for normal, invalid, unauthorized, failure, timeout, disconnect, restart, and cleanup paths as applicable.
9. Update requirements and registries when approved contracts or behavior change.
10. Report deviations instead of silently redesigning the feature.

## Guardrails
- no implementation before material requirements are approved
- no unrelated refactor
- no business logic in `main.lua`
- no hidden custom loader
- no new dependency without justification
- no invented UI flow; use wireframe-first when UI is involved
