---
name: create-resource
description: Scaffold an approved FiveM resource from this template. Run discover-requirements first unless a complete approved brief already exists.
use_when: implementing a new resource after requirements approval
---

# Create Resource

## Required input
- approved `.ai/memory/requirements/<resource>.md`
- `.ai/features/<feature>.md`

If either is missing or material questions remain, stop and use `discover-requirements` before editing production code.

## Read
- `AGENTS.md`
- approved requirements and feature registry
- `.ai/rules/fivem.md`
- `.ai/rules/lua.md`
- approved config/module decisions
- `.ai/rules/ui.md` only when NUI is approved
- `.ai/rules/security.md` when client/server communication exists
- relevant event/database registries

## Workflow
1. Verify the brief status is Approved and identify any implementation assumptions.
2. Inspect the template and remove irrelevant example-only parts.
3. Apply the approved client/server/shared/config boundaries.
4. Apply approved config domains and explicit load dependencies.
5. Create focused modules; keep `main.lua` as bootstrap.
6. Implement documented event/API/data contracts before wiring consumers.
7. Add optional NUI/database/framework code only when approved.
8. Update `fxmanifest.lua` deterministically.
9. Add tests for approved normal, invalid, failure, disconnect, restart, and cleanup paths.
10. Update feature, contract, database, component, and resource registries.
11. Record implementation deviations; do not silently change approved behavior.

## Done when
- approved requirements are implemented or deviations are documented
- manifest references exist
- runtime boundaries and server authority are valid
- no client secret/authority leak exists
- NUI builds when present
- public contracts and configuration are documented
- applicable checklists pass
