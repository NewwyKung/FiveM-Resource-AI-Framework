---
name: add-integration
description: Add or change a framework, database, inventory, notify, logger, progress, target, or custom resource provider without coupling feature code to it.
---

# Add Integration

## Read
- `AGENTS.md`
- `.ai/rules/integrations.md`
- `.ai/rules/fivem.md`
- `.ai/rules/security.md` when server data or player objects are involved
- `integrations.json`
- `.ai/integrations/INDEX.md`
- selected provider document and affected runtime adapter only

## Discovery inputs
Resolve before implementation:
- capability and provider resource name
- client/server/shared availability
- source export/event/callback signature
- operation inputs and return behavior
- option-by-option runtime support
- required, optional, default, and conditional options
- external dependencies per operation or option
- player/framework objects that must remain server-only
- failure behavior when the provider or dependency is unavailable
- whether the provider has been tested and may be marked verified

## Workflow
1. Define the capability-level operation used by feature code.
2. Build an option matrix before writing the adapter.
3. Update `integrations.json` and `config/config.integrations.lua`.
4. Split client and server adapters when availability or option rules differ.
5. Copy only allowed options into the provider payload; do not forward unknown fields blindly.
6. Validate runtime-only fields, required values, resource state, and conditional dependencies.
7. Map provider results to stable capability-level success/error contracts.
8. Create or update `.ai/integrations/providers/<provider>.md`.
9. Add representative client, server, invalid-option, missing-resource, and missing-dependency tests or documented test cases.
10. Update feature/event registries only when public behavior changes.

## Token discipline
- Read only the selected provider.
- Link to adapter source instead of duplicating its implementation in multiple docs.
- Store concise option matrices, not full external documentation.
- Do not preload ESX, QBCore, Qbox, oxmysql, or unrelated custom provider docs.

## Done when
- feature code has no direct provider calls
- runtime-specific options are enforced
- conditional dependencies are represented
- provider selection and runtime config agree
- provider documentation and verification status are current
- failure behavior is explicit
