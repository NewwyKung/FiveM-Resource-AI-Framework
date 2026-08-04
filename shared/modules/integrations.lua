Integrations = Integrations or {}

local function validateOptions(options)
    if type(options) ~= 'table' then
        return false, 'INVALID_OPTIONS'
    end

    return true
end

Integrations.ValidateOptions = validateOptions
Integrations.Logger = Integrations.Logger or {}

function Integrations.Logger.Send(_options)
    return false, 'LOGGER_PROVIDER_NOT_CONFIGURED'
end
