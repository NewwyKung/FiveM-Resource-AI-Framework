# Runtime-specific Integration Provider Example

Use this example only when an external export/event is available on multiple runtimes with different option rules.

## Pattern

```text
Feature
→ Integrations.<Capability>.<Operation>(options)
→ client or server adapter
→ external provider
```

## Required work

1. Declare the provider in `integrations.json`.
2. Mirror runtime selection in `config/config.integrations.lua`.
3. Create an option matrix in `.ai/integrations/providers/<provider>.md`.
4. Split client/server adapters when option availability differs.
5. Reject invalid runtime fields.
6. Validate conditional dependencies.
7. Return stable capability-level error codes.

## Example runtime difference

- Server requires a framework player object.
- Client forbids server player objects.
- A screenshot option is client-only and requires a screenshot resource.

See the implemented logger example:
- `.ai/integrations/providers/nc_discordlogs.md`
- `client/modules/integrations/logger.nc_discordlogs.lua`
- `server/modules/integrations/logger.nc_discordlogs.lua`

Do not read or copy this example for integrations whose APIs are identical on every runtime.
