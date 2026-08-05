local function closeShop()
    SetNuiFocus(false, false)
    SendNUIMessage({ action = 'close' })
end

RegisterCommand(ExampleShopConfig.Command, function()
    SetNuiFocus(true, true)
    SendNUIMessage({ action = 'open', data = { items = ExampleShopConfig.Items } })
end, false)

RegisterNUICallback('purchase', function(data, callback)
    if type(data) ~= 'table' then
        callback({ ok = false, error = 'INVALID_PAYLOAD' })
        return
    end

    local requestId = data.requestId
    if type(requestId) ~= 'string'
        or #requestId < 1
        or #requestId > 64
        or not requestId:match('^[A-Za-z0-9:_-]+$') then
        callback({ ok = false, error = 'INVALID_REQUEST_ID' })
        return
    end

    callback({ ok = true, requestId = requestId })

    TriggerServerEvent(ExampleShopContracts.PurchaseEvent, {
        action = ExampleShopContracts.Actions.Purchase,
        requestId = requestId,
        payload = {
            itemId = data.itemId,
            quantity = tonumber(data.quantity),
        },
    })
end)

RegisterNUICallback('close', function(_, callback)
    closeShop()
    callback({ ok = true })
end)

RegisterNetEvent(ExampleShopContracts.ResultEvent, function(result)
    if type(result) ~= 'table' or type(result.requestId) ~= 'string' or type(result.ok) ~= 'boolean' then return end
    SendNUIMessage({ action = 'purchaseResult', data = result })
end)

AddEventHandler('onClientResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then closeShop() end
end)
