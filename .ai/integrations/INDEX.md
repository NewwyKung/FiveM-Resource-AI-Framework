# Integration Index

Provider selection lives only in `/integrations.json`. Do not duplicate selected provider values in this file.

## Registered providers

Provider profiles under `.ai/integrations/providers/` may be registered for future use without being selected. Add one concise row only after its profile exists.

| Capability | Provider | Resource | Status | Profile |
|---|---|---|---|---|
| — | — | — | — | — |

Statuses:
- `documented`: extracted from supplied docs but not runtime-tested
- `partially-verified`: some operations tested
- `verified`: declared operations tested against the named version

## Context rule

### Register provider documentation
Read only:
1. supplied docs/schema/examples
2. `.ai/integrations/TEMPLATE.md`
3. this index

Do not read or modify runtime adapters, `integrations.json`, or feature code.

### Activate a provider
Read only:
1. `integrations.json`
2. the selected provider profile
3. affected feature requirements/registry
4. source for the requested operation and runtime

Do not preload unrelated providers.

## Contract rule

Provider profiles define each operation with:
- call type and signature
- runtime availability
- option name/type
- required/optional/default/conditional/forbidden state
- option-specific dependencies
- return/error behavior
- limitations and unresolved details

Use `TEMPLATE.md` for new providers. Feature documents link to provider profiles instead of copying provider APIs.
