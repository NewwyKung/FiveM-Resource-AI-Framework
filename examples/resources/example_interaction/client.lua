local resourceName = GetCurrentResourceName()

RegisterCommand(Config.Command, function()
    TriggerServerEvent(('%s:server:requestInteraction'):format(resourceName), {
        requestedAt = GetGameTimer(),
    })
end, false)

RegisterNetEvent(('%s:client:interactionResult'):format(resourceName), function(result)
    if type(result) ~= 'table' then
        return
    end

    if result.ok then
        print(('[%s] %s'):format(resourceName, result.message or Config.Message))
        return
    end

    print(('[%s] Interaction failed: %s'):format(resourceName, result.error or 'UNKNOWN_ERROR'))
end)
