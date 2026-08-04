# Architecture Overview

## Repository boundaries

`resource/` is the single FiveM development resource and FXServer junction target. Repository-level AI guidance, documentation, examples, scripts, tests, types, and generated release folders remain outside it. Release packaging copies allowlisted contents of `resource/` directly to a deployable release root.

## Development flow

```text
User request
→ Requirements discovery
→ Approved requirements and feature registry
→ Runtime/UI contracts
→ Implementation
→ Validation and cleanup
→ Deployable release
```

## Runtime boundaries

```text
Client: presentation, controls, local entities, NUI focus
Server: authority, validation, economy, persistence
Shared: contracts, constants, safe cross-runtime utilities
Config: editable behavior without business logic
UI: Svelte presentation, state, and NUI transport
```

The client sends intent. The server re-reads authoritative state and decides the result.

## Feature complexity tiers

```text
Simple: handler → service
Persistent: handler → service → repository → database provider
Complex: handler → use case → domain modules → repositories/adapters
```

Use the smallest tier that satisfies the approved requirements.

## External resources

```text
Feature
→ capability contract
→ selected adapter
→ external framework/library/resource
```

Provider documentation may be registered without activating runtime code. Only selected operations and runtimes should generate adapters.

## AI context

```text
AGENTS.md
→ context budget
→ one primary skill
→ relevant rules/recipe
→ active requirement
→ feature/provider contracts
→ affected source files
```

Long references, unrelated providers, delivered history, and generated output are not loaded by default.

## UI flow

```text
Requirements
→ wireframe
→ visual design
→ Svelte implementation
→ browser/FiveM review
```

UI transport uses the shared NUI bridge. Components must dispose listeners and return focus correctly.

## Release flow

```text
Validate
→ build UI
→ clean unused runtime files
→ copy allowlisted files
→ patch production manifest/version
→ sanitize explicit secrets
→ scan final folder
```

The output under `release/<name>-<version>/` must not depend on source-only files outside the folder.
