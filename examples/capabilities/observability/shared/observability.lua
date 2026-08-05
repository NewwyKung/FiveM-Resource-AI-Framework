local Observability = {}
local allowedLevels = { debug = true, info = true, warn = true, error = true }

---@param emit fun(record: table)
---@param options? { developmentTiming?: boolean }
function Observability.Create(emit, options)
    assert(type(emit) == 'function', 'observability emit operation is required')
    options = options or {}

    local logger = {}

    ---@param level 'debug'|'info'|'warn'|'error'
    ---@param event string
    ---@param fields? table<string, unknown>
    function logger.Log(level, event, fields)
        assert(allowedLevels[level] == true, 'observability level is invalid')
        assert(type(event) == 'string' and #event >= 1 and #event <= 128, 'observability event is invalid')
        assert(fields == nil or type(fields) == 'table', 'observability fields must be a table')
        emit({ level = level, event = event, timestamp = os.time(), fields = fields or {} })
    end

    ---@param event string
    ---@param fields? table<string, unknown>
    ---@return fun(extraFields?: table<string, unknown>)
    function logger.Time(event, fields)
        if options.developmentTiming ~= true then return function() end end
        local startedAt = GetGameTimer()
        return function(extraFields)
            local result = {}
            for key, value in pairs(fields or {}) do result[key] = value end
            for key, value in pairs(extraFields or {}) do result[key] = value end
            result.durationMs = GetGameTimer() - startedAt
            logger.Log('debug', event, result)
        end
    end

    return logger
end

return Observability
