# ADR-003: Capability Provider Integrations

- Status: Approved

## Decision

External frameworks, databases, libraries, and custom resources are integrated through capability contracts and runtime-specific adapters.

```text
Feature
→ capability contract
→ selected runtime adapter
→ external resource
```

Provider selection is declared in `integrations.json` for AI/tooling and mirrored in `resource/config/config.integrations.lua` only when runtime integration is activated.

## Runtime-specific options

A provider may expose the same operation on client and server while supporting different options. Each provider document must define an option matrix containing:

- type
- required/optional/default
- client/server/shared availability
- conditional requirements
- external dependencies
- failure behavior

Adapters must reject invalid runtime options and copy only allowed fields into provider payloads.

## Provider state

A provider is not marked verified until representative runtime tests pass. `supported` or implemented does not imply verified.

## Context efficiency

AI reads `integrations.json` first, then only the selected provider document and affected runtime adapter. Unselected provider documentation is not loaded.

## Consequences

- Feature modules remain independent from ESX, QBCore, Qbox, oxmysql, and custom resource APIs.
- Client/server differences are explicit rather than hidden in feature code.
- Provider replacement is localized to adapter/config/contract files.
- Integration metadata must stay synchronized with runtime configuration.
