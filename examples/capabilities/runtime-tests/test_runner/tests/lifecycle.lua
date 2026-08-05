local targetResource = GetConvar('runtime_tests_target', '')
local providerResource = GetConvar('runtime_tests_provider', '')

if targetResource ~= '' then
    RuntimeTests.Register('target resource is started', function()
        local state = GetResourceState(targetResource)
        return state == 'started', ('target state is %s'):format(state)
    end)

    RuntimeTests.Register('target server runtime reports active', function()
        local ok, status = pcall(function()
            return exports[targetResource]:GetRuntimeStatus()
        end)
        if not ok then return false, status end
        return type(status) == 'table' and status.active == true and status.runtime == 'server', 'invalid runtime status'
    end)
end

if providerResource ~= '' then
    RuntimeTests.Register('selected provider is available', function()
        local state = GetResourceState(providerResource)
        return state == 'started', ('provider state is %s'):format(state)
    end)
end
