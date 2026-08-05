local lastRequestAt = {}
local minimumIntervalMs = 1000

RegisterNetEvent(HelloWorldContracts.RequestEvent, function(envelope)
    local playerId = source
    local valid, errorCode = HelloWorldContracts.ValidateRequest(envelope)
    if not valid then
        TriggerClientEvent(HelloWorldContracts.ResultEvent, playerId, {
            ok = false,
            requestId = HelloWorldContracts.GetRequestId(envelope) or 'unknown',
            error = errorCode,
        })
        return
    end

    local now = GetGameTimer()
    if lastRequestAt[playerId] and now - lastRequestAt[playerId] < minimumIntervalMs then
        TriggerClientEvent(HelloWorldContracts.ResultEvent, playerId, {
            ok = false,
            requestId = envelope.requestId,
            error = 'RATE_LIMITED',
        })
        return
    end

    lastRequestAt[playerId] = now
    local message = type(envelope.payload.message) == 'string' and envelope.payload.message ~= ''
        and envelope.payload.message
        or ('Hello, player %d'):format(playerId)

    TriggerClientEvent(HelloWorldContracts.ResultEvent, playerId, {
        ok = true,
        requestId = envelope.requestId,
        message = message,
    })
end)

AddEventHandler('playerDropped', function()
    local playerId = source
    lastRequestAt[playerId] = nil
end)

AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then lastRequestAt = {} end
end)
