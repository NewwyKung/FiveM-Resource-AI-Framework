# Optional Integrations

The template does not ship active ESX, QBCore, Qbox, oxmysql, notify, logger, progress, inventory, or target bridges by default.

## Principle

```text
Feature → capability contract → selected adapter → external resource
```

Create a contract and adapter only when an approved feature uses that capability. Do not generate every possible provider.

## Discovery

Read `.ai/memory/environment.md` first. Ask only for unresolved capabilities required by the current work:

- framework;
- shared libraries;
- database driver and persistence needs;
- inventory/money;
- notify/logger/progress/target and custom resources.

When custom provider docs are supplied, register a concise profile under `.ai/integrations/providers/`. Registration does not activate the provider.

## Runtime generation

When a provider is activated:

1. implement only operations required by approved features;
2. separate client and server adapters when signatures differ;
3. add only required manifest entries and dependencies;
4. keep provider calls inside the adapter;
5. test missing-resource and invalid-input behavior.

## Cleanup

Before completion or release, remove:

- adapters not referenced by an approved feature;
- inactive runtime config;
- unused dependencies and manifest entries;
- copied example files;
- provider-specific tests for providers no longer active.

Keep registered provider profiles because they are reusable documentation and cost no runtime resources.
