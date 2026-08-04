---
name: create-resource
description: Scaffold a new FiveM resource from this template.
use_when: starting a new script or converting this template into a concrete resource
---

# Create Resource

## Read
- `AGENTS.md`
- `.ai/rules/fivem.md`
- `.ai/rules/lua.md`
- approved config/module decisions
- `.ai/rules/ui.md` only when NUI is required
- `.ai/rules/security.md` when client/server communication exists

## Inputs to resolve
- resource purpose and name
- standalone or framework integration
- UI, database, localization, and asset requirements
- public exports/events/callbacks
- authoritative server state

## Workflow
1. Inspect the template and remove irrelevant example-only parts.
2. Define client/server/shared/config boundaries.
3. Define config domains and explicit load dependencies.
4. Create focused modules; keep `main.lua` as bootstrap.
5. Define event/API contracts before implementation.
6. Add optional NUI/database/framework code only when required.
7. Update `fxmanifest.lua` deterministically.
8. Add minimum tests and documentation.

## Done when
- manifest references exist
- runtime boundaries are valid
- no client secret/authority leak exists
- NUI builds when present
- public contracts and configuration are documented
