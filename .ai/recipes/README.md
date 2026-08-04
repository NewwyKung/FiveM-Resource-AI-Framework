# Task Recipes

Recipes are short deterministic workflows for models of different capability levels. Load at most one primary recipe per implementation phase.

## Validated server operation

1. Define the event/callback/export contract.
2. Validate source and payload shape.
3. Bound strings, numbers, enums, arrays, and metadata.
4. Apply rate limit or idempotency when abuse or duplication matters.
5. Re-read authoritative server state.
6. Call a service/use case.
7. Return a stable result code.
8. Add audit logging for privileged/economic changes.
9. Add invalid, spam, disconnect, and restart tests as applicable.

## Persistent mutation

1. Define transaction boundaries and duplicate-request behavior.
2. Use handler -> service -> repository -> selected database provider.
3. Validate before opening the transaction where possible.
4. Commit related writes atomically.
5. Define timeout, rollback, and provider-unavailable behavior.
6. Test success, rejection, duplicate, transaction failure, disconnect, and restart.

## NUI screen

1. Require approved requirements, wireframe, and visual design.
2. Define `{ action, data }` message contracts.
3. Use the shared NUI bridge helpers.
4. Define visibility, focus owner, Escape, loading, empty, error, and close behavior.
5. Dispose temporary listeners.
6. Use `calc(<number> * var(--px-to-vh))` for design-pixel dimensions.
7. Test in browser mocks, build output, and FiveM runtime.

## External provider

1. Read `integrations.json` and the selected provider profile only.
2. Confirm runtime, operation, arguments, options, defaults, and dependencies.
3. Create only the adapter operations required by the feature.
4. Validate provider/resource availability.
5. Translate provider failures into stable internal errors.
6. Remove unused provider code and manifest dependencies.

## Public API

1. Define runtime, authority, visibility, input schema, return schema, side effects, and compatibility.
2. Validate every public input.
3. Keep stable return shapes and error codes.
4. Add registry documentation and compatibility tests.
5. Record breaking changes and version bump requirements.