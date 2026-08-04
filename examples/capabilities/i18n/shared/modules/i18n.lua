---@class I18NModule
---@field fallback string
---@field current string
---@field locales table<string, table<string, string>>
local I18N = {
    fallback = 'en',
    current = 'en',
    locales = {},
}

---@param locale string
---@param messages table<string, string>
function I18N.Register(locale, messages)
    assert(type(locale) == 'string' and locale ~= '', 'locale must be a non-empty string')
    assert(type(messages) == 'table', 'messages must be a table')
    I18N.locales[locale] = messages
end

---@param locale string
---@return boolean
function I18N.SetLocale(locale)
    if not I18N.locales[locale] then return false end
    I18N.current = locale
    return true
end

local function lookup(locale, key)
    local messages = I18N.locales[locale]
    return messages and messages[key] or nil
end

local function format(message, arguments)
    return (message:gsub('{([%w_]+)}', function(name)
        local value = arguments[name]
        return value == nil and ('{' .. name .. '}') or tostring(value)
    end))
end

---@param key string
---@param arguments? table<string, string|number>
---@param locale? string
---@return string
function I18N.Translate(key, arguments, locale)
    locale = locale or I18N.current
    arguments = arguments or {}

    local message = lookup(locale, key)
        or lookup(I18N.fallback, key)
        or key

    return format(message, arguments)
end

return I18N
