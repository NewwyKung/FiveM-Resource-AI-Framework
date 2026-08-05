local playerRequests = {}

local function reply(playerId, result)
    TriggerClientEvent(ExampleShopContracts.ResultEvent, playerId, result)
end

local function getPlayerRequests(playerId)
    playerRequests[playerId] = playerRequests[playerId] or {
        lastRequestAt = nil,
        results = {},
        order = {},
    }
    return playerRequests[playerId]
end

local function pruneResults(state, now)
    while #state.order > 0 do
        local oldest = state.order[1]
        local expired = now - oldest.storedAt > ExampleShopConfig.IdempotencyRetentionMs
        local overLimit = #state.order > ExampleShopConfig.MaxRememberedRequests
        if not expired and not overLimit then break end

        table.remove(state.order, 1)
        if state.results[oldest.requestId] and state.results[oldest.requestId].storedAt == oldest.storedAt then
            state.results[oldest.requestId] = nil
        end
    end
end

local function rememberResult(state, requestId, result, now)
    state.results[requestId] = { result = result, storedAt = now }
    state.order[#state.order + 1] = { requestId = requestId, storedAt = now }
    pruneResults(state, now)
end

RegisterNetEvent(ExampleShopContracts.PurchaseEvent, function(envelope)
    local playerId = source
    local valid, errorCode = ExampleShopContracts.ValidatePurchase(envelope)
    if not valid then
        reply(playerId, {
            ok = false,
            requestId = ExampleShopContracts.GetRequestId(envelope) or 'unknown',
            error = errorCode,
        })
        return
    end

    local now = GetGameTimer()
    local state = getPlayerRequests(playerId)
    pruneResults(state, now)

    local remembered = state.results[envelope.requestId]
    if remembered then
        reply(playerId, remembered.result)
        return
    end

    if state.lastRequestAt and now - state.lastRequestAt < ExampleShopConfig.MinimumRequestIntervalMs then
        local result = {
            ok = false,
            requestId = envelope.requestId,
            error = 'RATE_LIMITED',
        }
        rememberResult(state, envelope.requestId, result, now)
        reply(playerId, result)
        return
    end

    state.lastRequestAt = now
    local result = ExampleShopService.Purchase(playerId, envelope)
    rememberResult(state, envelope.requestId, result, now)
    reply(playerId, result)
end)

AddEventHandler('playerDropped', function()
    local playerId = source
    playerRequests[playerId] = nil
    ExampleShopRepository.DropPlayer(playerId)
end)

AddEventHandler('onResourceStop', function(resourceName)
    if resourceName ~= GetCurrentResourceName() then return end
    playerRequests = {}
    ExampleShopRepository.Reset()
end)
