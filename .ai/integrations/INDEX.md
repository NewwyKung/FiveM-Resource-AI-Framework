# Integration Index

Read `integrations.json` first. Load only the selected capability contract and selected runtime adapter.

| Capability | Runtime contract | Selected provider |
|---|---|---|
| Framework | provider-defined | `standalone` |
| Database | server | `none` |
| Inventory | client/server | `none` |
| Notify | client/server | `none` |
| Logger | client/server | `nc_discordlogs` |
| Progress | client | `none` |
| Target | client | `none` |

## Context rule

For an integration task, read only:
1. `integrations.json`
2. this index
3. the selected provider document
4. the adapter for the affected runtime
5. the feature files that call the capability

Do not load unused providers or copy external API documentation into feature files.

## Contract rule

Provider documents must define operations and an option matrix containing:
- option name and type
- required/optional/default
- allowed runtimes
- conditional requirements
- external dependencies
- provider limitations

Use `TEMPLATE.md` for new providers.
