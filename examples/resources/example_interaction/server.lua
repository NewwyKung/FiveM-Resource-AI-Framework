local resourceName = GetCurrentResourceName()
local lastRequestAt = {}

local function reply(source, result)
    TriggerClientEvent(('%s:client:interactionResult'):format(resourceName), source, result)
end

RegisterNetEvent(('%s:server:requestInteraction'):format(resourceName), function(payload)
    local source = source

    if type(payload) ~= 'table' then
        reply(source, { ok = false, error = 'INVALID_PAYLOAD' })
        return
    end

    local now = GetGameTimer()
    local previous = lastRequestAt[source] or 0

    if now - previous < Config.CooldownMs then
        reply(source, { ok = false, error = 'RATE_LIMITED' })
        return
    end

    lastRequestAt[source] = now
    reply(source, { ok = true, message = Config.Message })
end)

AddEventHandler('playerDropped', function()
    lastRequestAt[source] = nil
end)

AddEventHandler('onResourceStop', function(stoppedResource)
    if stoppedResource == resourceName then
        lastRequestAt = {}
    end
end)
