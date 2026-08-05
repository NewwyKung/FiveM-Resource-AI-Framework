---@class ServerResourceLifecycleController: ResourceLifecycleController
---@field AddPlayerCleanup fun(name: string, callback: fun(playerId: number, reason: string))

ServerLifecycle = ResourceLifecycle.Create('server')
---@cast ServerLifecycle ServerResourceLifecycleController

local playerCleanupHandlers = {}

---@param name string
---@param callback fun(playerId: number, reason: string)
function ServerLifecycle.AddPlayerCleanup(name, callback)
    assert(type(name) == 'string' and name ~= '', 'player cleanup name is required')
    assert(type(callback) == 'function', 'player cleanup callback is required')
    assert(playerCleanupHandlers[name] == nil, ('duplicate player cleanup owner: %s'):format(name))
    playerCleanupHandlers[name] = callback
end

AddEventHandler('playerDropped', function(reason)
    local playerId = source
    for name, callback in pairs(playerCleanupHandlers) do
        local ok, errorMessage = pcall(callback, playerId, reason)
        if not ok then
            print(('[%s] player cleanup %s failed: %s'):format(GetCurrentResourceName(), name, errorMessage))
        end
    end
end)

AddEventHandler('onResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        ServerLifecycle.Start()
    end
end)

AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        ServerLifecycle.Stop()
    end
end)
