---@class RuntimeTest
---@field name string
---@field run fun(): boolean, string?

local tests = {}

---@param name string
---@param callback fun(): boolean, string?
local function RegisterRuntimeTest(name, callback)
    assert(type(name) == 'string' and name ~= '', 'test name is required')
    assert(type(callback) == 'function', 'test callback is required')
    tests[#tests + 1] = { name = name, run = callback }
end

exports('RegisterRuntimeTest', RegisterRuntimeTest)

RegisterCommand('runtime-tests', function(source)
    if source ~= 0 then
        print('[runtime-tests] Run this command from the server console.')
        return
    end

    local passed = 0
    local failed = 0

    for _, test in ipairs(tests) do
        local ok, result, errorMessage = pcall(test.run)
        local success = ok and result == true

        if success then
            passed = passed + 1
            print(('[runtime-tests] PASS %s'):format(test.name))
        else
            failed = failed + 1
            local reason = ok and errorMessage or result
            print(('[runtime-tests] FAIL %s: %s'):format(test.name, tostring(reason or 'unknown error')))
        end
    end

    print(('[runtime-tests] complete: %d passed, %d failed'):format(passed, failed))
end, true)
