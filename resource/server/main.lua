ServerLifecycle.Start()

exports('GetRuntimeStatus', function()
    return {
        active = ServerLifecycle.IsActive(),
        resource = GetCurrentResourceName(),
        runtime = 'server',
    }
end)
