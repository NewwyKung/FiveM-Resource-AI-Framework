local resourceName = GetCurrentResourceName()
local lastRequestAt = {}

local function reply(playerId, result)
    TriggerClientEvent(('%s:client:interactionResult'):format(resourceName), playerId, result)
end

RegisterNetEvent(('%s:server:requestInteraction'):format(resourceName), function(envelope)
    local playerId = source

    if type(envelope) ~= 'table' or type(envelope.payload) ~= 'table' then
        reply(playerId, { ok = false, requestId = 'unknown', error = 'INVALID_PAYLOAD' })
        return
    end
    if type(envelope.requestId) ~= 'string'
        or #envelope.requestId < 1
        or #envelope.requestId > 64
        or not envelope.requestId:match('^[A-Za-z0-9:_-]+$') then
        reply(playerId, { ok = false, requestId = 'unknown', error = 'INVALID_REQUEST_ID' })
        return
    end
    if envelope.action ~= Config.Action then
        reply(playerId, { ok = false, requestId = envelope.requestId, error = 'INVALID_ACTION' })
        return
    end

    local now = GetGameTimer()
    local previous = lastRequestAt[playerId]

    if previous and now - previous < Config.CooldownMs then
        reply(playerId, { ok = false, requestId = envelope.requestId, error = 'RATE_LIMITED' })
        return
    end

    lastRequestAt[playerId] = now
    reply(playerId, { ok = true, requestId = envelope.requestId, message = Config.Message })
end)

AddEventHandler('playerDropped', function()
    local playerId = source
    lastRequestAt[playerId] = nil
end)

AddEventHandler('onResourceStop', function(stoppedResource)
    if stoppedResource == resourceName then
        lastRequestAt = {}
    end
end)
