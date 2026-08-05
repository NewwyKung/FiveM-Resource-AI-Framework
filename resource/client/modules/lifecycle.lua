ClientLifecycle = ResourceLifecycle.Create('client')

AddEventHandler('onClientResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        ClientLifecycle.Start()
    end
end)

AddEventHandler('onClientResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        ClientLifecycle.Stop()
    end
end)
