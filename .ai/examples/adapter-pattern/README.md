# Adapter Pattern Example

Use only when an approved feature needs an external framework, library, or resource.

## Pattern

```text
feature module
→ capability interface
→ selected runtime adapter
→ provider export/event/callback
```

Do not copy this example into Runtime unless the capability is required. Implement only operations used by the feature.

```lua
-- Feature code depends on a capability, not a provider.
local ok, resultOrError = PlayerCapability.GetIdentifier(source)
```

```lua
-- Selected server adapter owns provider-specific calls.
function PlayerCapability.GetIdentifier(source)
    -- Translate provider output into the stable capability contract.
end
```

## Required documentation

- selected provider in `.ai/memory/environment.md`;
- normalized provider profile under `.ai/integrations/providers/`;
- runtime and operation contract;
- failure behavior;
- tests for required operations.

## Cleanup

Delete adapters and manifest dependencies when no approved feature references the capability. Keep the provider profile for future reuse.
