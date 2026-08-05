local requestSequence = 0

RegisterCommand('hello-world', function(_, args)
    requestSequence = requestSequence + 1
    local requestId = ('hello:%d:%d'):format(GetGameTimer(), requestSequence)

    TriggerServerEvent(HelloWorldContracts.RequestEvent, {
        action = HelloWorldContracts.Actions.Hello,
        requestId = requestId,
        payload = {
            message = table.concat(args, ' '),
        },
    })
end, false)

RegisterNetEvent(HelloWorldContracts.ResultEvent, function(result)
    if type(result) ~= 'table' or type(result.requestId) ~= 'string' then return end

    if result.ok then
        print(('[hello-world] %s (%s)'):format(result.message, result.requestId))
    else
        print(('[hello-world] request failed: %s (%s)'):format(result.error or 'UNKNOWN_ERROR', result.requestId))
    end
end)
