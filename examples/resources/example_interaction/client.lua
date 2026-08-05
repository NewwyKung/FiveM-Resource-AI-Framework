local resourceName = GetCurrentResourceName()
local requestSequence = 0

RegisterCommand(Config.Command, function()
    requestSequence = requestSequence + 1
    TriggerServerEvent(('%s:server:requestInteraction'):format(resourceName), {
        action = Config.Action,
        requestId = ('interaction:%d:%d'):format(GetGameTimer(), requestSequence),
        payload = {},
    })
end, false)

RegisterNetEvent(('%s:client:interactionResult'):format(resourceName), function(result)
    if type(result) ~= 'table' or type(result.requestId) ~= 'string' then
        return
    end

    if result.ok then
        print(('[%s] %s'):format(resourceName, result.message or Config.Message))
        return
    end

    print(('[%s] Interaction failed: %s'):format(resourceName, result.error or 'UNKNOWN_ERROR'))
end)
