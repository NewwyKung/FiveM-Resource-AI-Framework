---@class ResourceLifecycleController
---@field Start fun(): boolean
---@field Stop fun(): boolean
---@field AddCleanup fun(name: string, callback: fun())
---@field IsActive fun(): boolean

ResourceLifecycle = ResourceLifecycle or {}

---@param runtime 'client'|'server'
---@return ResourceLifecycleController
function ResourceLifecycle.Create(runtime)
    local active = false
    local cleanups = {}

    return {
        Start = function()
            if active then return false end
            active = true
            print(('[%s] %s runtime started'):format(GetCurrentResourceName(), runtime))
            return true
        end,
        Stop = function()
            if not active then return false end
            active = false

            for name, callback in pairs(cleanups) do
                local ok, errorMessage = pcall(callback)
                if not ok then
                    print(('[%s] cleanup %s failed: %s'):format(GetCurrentResourceName(), name, errorMessage))
                end
            end

            return true
        end,
        AddCleanup = function(name, callback)
            assert(type(name) == 'string' and name ~= '', 'cleanup name is required')
            assert(type(callback) == 'function', 'cleanup callback is required')
            assert(cleanups[name] == nil, ('duplicate cleanup owner: %s'):format(name))
            cleanups[name] = callback
        end,
        IsActive = function()
            return active
        end,
    }
end
