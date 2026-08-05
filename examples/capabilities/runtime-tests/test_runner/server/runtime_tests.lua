---@class RuntimeTest
---@field name string
---@field run fun(): boolean, string?

RuntimeTests = {}

local tests = {}

---@param name string
---@param callback fun(): boolean, string?
function RuntimeTests.Register(name, callback)
    assert(type(name) == 'string' and name ~= '', 'test name is required')
    assert(type(callback) == 'function', 'test callback is required')
    assert(tests[name] == nil, ('duplicate runtime test: %s'):format(name))
    tests[name] = { name = name, run = callback }
end

---@param payload unknown
---@param allowedActions? table<string, boolean>
---@return boolean valid
---@return string? errorCode
function RuntimeTests.ValidateEnvelope(payload, allowedActions)
    if type(payload) ~= 'table' then return false, 'INVALID_PAYLOAD' end
    if type(payload.requestId) ~= 'string'
        or #payload.requestId < 1
        or #payload.requestId > 64
        or not payload.requestId:match('^[A-Za-z0-9:_-]+$') then
        return false, 'INVALID_REQUEST_ID'
    end
    if type(payload.action) ~= 'string'
        or #payload.action < 1
        or #payload.action > 64
        or not payload.action:match('^[A-Za-z][A-Za-z0-9:_-]*$') then
        return false, 'INVALID_ACTION'
    end
    if allowedActions and allowedActions[payload.action] ~= true then return false, 'INVALID_ACTION' end
    if type(payload.payload) ~= 'table' then return false, 'INVALID_PAYLOAD' end
    return true
end

---@param value unknown
---@return boolean
function RuntimeTests.ValidateStructuredError(value)
    return type(value) == 'table'
        and type(value.code) == 'string'
        and value.code:match('^[A-Z][A-Z0-9_]+$') ~= nil
        and type(value.messageKey) == 'string'
        and type(value.details) == 'table'
        and (value.requestId == nil or type(value.requestId) == 'string')
        and type(value.retryable) == 'boolean'
end

function RuntimeTests.List()
    local names = {}
    for name in pairs(tests) do names[#names + 1] = name end
    table.sort(names)
    return names
end

---@return number passed
---@return number failed
function RuntimeTests.RunAll()
    local passed = 0
    local failed = 0

    for _, name in ipairs(RuntimeTests.List()) do
        local test = tests[name]
        local startedAt = GetGameTimer()
        local ok, result, errorMessage = pcall(test.run)
        local durationMs = GetGameTimer() - startedAt
        local success = ok and result == true

        if success then
            passed = passed + 1
            print(('[runtime-tests] PASS %s (%dms)'):format(name, durationMs))
        else
            failed = failed + 1
            local reason = ok and errorMessage or result
            print(('[runtime-tests] FAIL %s: %s'):format(name, tostring(reason or 'unknown error')))
        end
    end

    return passed, failed
end

exports('RegisterRuntimeTest', RuntimeTests.Register)
