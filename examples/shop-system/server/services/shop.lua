ExampleShopService = {}

---@param playerId number
---@param payload unknown
---@return table result
function ExampleShopService.Purchase(playerId, envelope)
    local valid, errorCode = ExampleShopContracts.ValidatePurchase(envelope)
    if not valid then
        local requestId = ExampleShopContracts.GetRequestId(envelope) or 'unknown'
        return { ok = false, requestId = requestId, error = errorCode }
    end

    local payload = envelope.payload
    local item = ExampleShopConfig.Items[payload.itemId]
    if not item then return { ok = false, requestId = envelope.requestId, error = 'ITEM_NOT_FOUND' } end

    local total = item.price * payload.quantity
    local success, repositoryResult = ExampleShopRepository.Purchase(playerId, payload.itemId, payload.quantity, total)
    if not success then return { ok = false, requestId = envelope.requestId, error = repositoryResult } end

    return {
        ok = true,
        requestId = envelope.requestId,
        data = {
            itemId = payload.itemId,
            quantity = payload.quantity,
            total = total,
            balance = repositoryResult.balance,
            itemCount = repositoryResult.itemCount,
        },
    }
end
