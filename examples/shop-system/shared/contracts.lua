ExampleShopContracts = {
    PurchaseEvent = 'example_shop:purchase',
    ResultEvent = 'example_shop:result',
    Actions = {
        Purchase = 'purchase',
    },
}

---@param envelope unknown
---@return string?
function ExampleShopContracts.GetRequestId(envelope)
    if type(envelope) ~= 'table' or type(envelope.requestId) ~= 'string' then return nil end
    if #envelope.requestId < 1 or #envelope.requestId > 64 then return nil end
    if not envelope.requestId:match('^[A-Za-z0-9:_-]+$') then return nil end
    return envelope.requestId
end

---@param envelope unknown
---@return boolean valid
---@return string? errorCode
function ExampleShopContracts.ValidatePurchase(envelope)
    if type(envelope) ~= 'table' then return false, 'INVALID_PAYLOAD' end
    if envelope.action ~= ExampleShopContracts.Actions.Purchase then return false, 'INVALID_ACTION' end
    if not ExampleShopContracts.GetRequestId(envelope) then
        return false, 'INVALID_REQUEST_ID'
    end
    if type(envelope.payload) ~= 'table' then return false, 'INVALID_PAYLOAD' end
    local payload = envelope.payload
    if type(payload.itemId) ~= 'string' or #payload.itemId < 1 or #payload.itemId > 64 then
        return false, 'INVALID_ITEM_ID'
    end
    if type(payload.quantity) ~= 'number' or payload.quantity % 1 ~= 0 then
        return false, 'INVALID_QUANTITY'
    end
    if payload.quantity < 1 or payload.quantity > ExampleShopConfig.MaxQuantity then
        return false, 'INVALID_QUANTITY'
    end
    return true
end
