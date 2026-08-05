---
name: add-integration
description: Register external resource documentation for reuse, or activate a registered provider for a feature. Registration must not create runtime adapters unless activation is explicitly requested.
---

# Add Integration

## Two modes

### Register mode (default)
Use when the user says a resource may be used, supplies docs/schema/examples, or asks AI to remember an integration.

Do only this:
1. Identify capability, resource name, versions, and supported runtimes.
2. Extract exports/events/callbacks into a concise provider profile.
3. Record option-level type, required/optional/default, runtime, conditions, dependencies, return behavior, and known limitations.
4. Add compact operation objects conforming to `docs/schemas/provider-operation.schema.json` when the provider has callable operations.
5. Preserve source terminology and mark unsupported or unclear details as unresolved.
6. Save `.ai/integrations/providers/<provider>.md` from the provider template.
7. Add the provider to `.ai/integrations/INDEX.md` as `registered`, not selected.
8. Do not update `integrations.json`, runtime config, `resource/fxmanifest.lua`, source modules, or tests.

### Activate mode
Use only when the user explicitly says the current resource/feature must use a registered provider.

Then:
1. Read only `integrations.json`, the selected provider profile, affected feature requirements, and relevant source.
2. Confirm capability, operation(s), runtime(s), and fallback behavior.
3. Update provider selection in `integrations.json` and `resource/config/config.integrations.lua`.
4. Create the smallest adapter needed by the approved feature; do not implement unused provider operations.
5. Split client/server adapters only when runtime contracts differ.
6. Validate required fields, runtime-only options, conditional dependencies, resource state, and stable failure behavior.
7. Add tests for only the activated operations.

## Intake from user-supplied docs
Accept any combination of:
- Markdown/text documentation
- code examples
- export/event/callback signatures
- JSON schema
- screenshots or attached documents
- resource/version name

Ask only for missing material facts. Do not ask the user to repeat details already present in the supplied source.

## Provider profile must contain
- capability and resource name
- source and version/date
- operations and call signatures
- runtime availability per operation
- option matrix per operation
- required, optional, default, conditional, forbidden fields
- option-specific dependencies
- return/error behavior
- examples reduced to the minimum useful form
- verification status: `documented`, `partially-verified`, or `verified`
- unresolved questions

## Token discipline
- Store the compact normalized profile, not the full copied documentation.
- Link or cite the supplied source location when available.
- On later tasks, read only the selected provider profile and requested operation.
- Never preload unrelated providers.
- Do not duplicate provider details in feature memory; feature files should link to the provider profile.

## Safety rule
Receiving provider documentation is not approval to integrate it. Default to Register mode. Runtime code changes require an explicit Activate request.
