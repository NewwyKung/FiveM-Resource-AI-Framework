# Server-authoritative Event Example

Use when a client requests an action that changes money, items, ownership, rewards, or persistent state.

```lua
-- client
TriggerServerEvent('example:server:confirmAction', {
    actionId = 'example',
})
```

```lua
-- server
RegisterNetEvent('example:server:confirmAction', function(payload)
    local source = source

    if type(payload) ~= 'table' or payload.actionId ~= 'example' then
        return
    end

    -- Re-check permission, location, ownership, cooldown, and current state here.
    TriggerClientEvent('example:client:actionResult', source, {
        ok = true,
    })
end)
```

Never accept client-provided prices, rewards, permissions, ownership, or final transaction results. Register the final contract under `.ai/events/`.
