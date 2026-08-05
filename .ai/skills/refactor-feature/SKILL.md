---
name: refactor-feature
description: Restructure an existing feature while preserving approved behavior, public contracts, data compatibility, and release integrity. Use for moves, boundary changes, dependency removal, or substantial internal redesign.
---

# Refactor Feature

## Gate

Before editing, record:

- behavior that must remain unchanged;
- public events, callbacks, exports, NUI messages, config, and database rows affected;
- migration and compatibility impact;
- existing test evidence and missing coverage;
- rollback plan and last known good revision.

Escalate before changing an authority boundary, persistent schema, external contract, or provider selection.

## Workflow

1. Read the active requirement, feature registry entry, affected source, and one relevant rule/recipe.
2. Map old path to new path and identify load-order/restart implications.
3. Add contract/regression coverage before structural edits where practical.
4. Apply incremental patches; replace a whole file only when intentional replacement is clearer and reviewable.
5. Update callers, manifests, adapters, tests, docs, and registries in the same coherent change.
6. Remove dead paths, dependencies, configs, adapters, generated references, and copied examples.
7. Validate release output and resource start/restart/stop behavior; report FXServer checks not run.
8. Roll back by reverting the isolated refactor commit or restoring the documented old path, never by destructive workspace reset.
