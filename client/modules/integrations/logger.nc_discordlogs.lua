local loggerConfig = Config.Integrations and Config.Integrations.logger

if not loggerConfig or loggerConfig.provider ~= 'nc_discordlogs' then
    return
end

local function copyAllowedOptions(options)
    local payload = {
        webhook = options.webhook,
        title = options.title,
        message = options.message,
        description = options.description,
        fields = options.fields,
        imageURL = options.imageURL,
        color = options.color,
        public = options.public,
        screenshot = options.screenshot,
    }

    return payload
end

function Integrations.Logger.Send(options)
    local valid, errorCode = Integrations.ValidateOptions(options)
    if not valid then
        return false, errorCode
    end

    if type(options.webhook) ~= 'string' or options.webhook == '' then
        return false, 'LOGGER_WEBHOOK_REQUIRED'
    end

    if options.xPlayer ~= nil or options.xTarget ~= nil then
        return false, 'LOGGER_SERVER_ONLY_OPTION'
    end

    if options.screenshot == true and GetResourceState('screenshot-basic') ~= 'started' then
        return false, 'LOGGER_SCREENSHOT_DEPENDENCY_MISSING'
    end

    local resourceName = loggerConfig.resource or 'nc_discordlogs'
    if GetResourceState(resourceName) ~= 'started' then
        return false, 'LOGGER_RESOURCE_NOT_STARTED'
    end

    exports[resourceName]:Discord(copyAllowedOptions(options))
    return true
end
