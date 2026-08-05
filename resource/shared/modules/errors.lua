---@class StructuredError
---@field code string
---@field messageKey string
---@field details table<string, unknown>
---@field requestId string?
---@field retryable boolean

ErrorContract = ErrorContract or {}

---@param code string
---@param messageKey string
---@param details? table<string, unknown>
---@param requestId? string
---@param retryable? boolean
---@return StructuredError
function ErrorContract.Create(code, messageKey, details, requestId, retryable)
    assert(type(code) == 'string' and code:match('^[A-Z][A-Z0-9_]+$'), 'error code must use UPPER_SNAKE_CASE')
    assert(type(messageKey) == 'string' and messageKey ~= '', 'error message key is required')
    assert(details == nil or type(details) == 'table', 'error details must be a table')
    assert(requestId == nil or (
        type(requestId) == 'string'
        and #requestId >= 1
        and #requestId <= 64
        and requestId:match('^[A-Za-z0-9:_-]+$') ~= nil
    ), 'error request ID must match the bounded request contract')

    return {
        code = code,
        messageKey = messageKey,
        details = details or {},
        requestId = requestId,
        retryable = retryable == true,
    }
end

---@param value unknown
---@return boolean
function ErrorContract.IsValid(value)
    return type(value) == 'table'
        and type(value.code) == 'string'
        and value.code:match('^[A-Z][A-Z0-9_]+$') ~= nil
        and type(value.messageKey) == 'string'
        and type(value.details) == 'table'
        and (value.requestId == nil or (
            type(value.requestId) == 'string'
            and #value.requestId >= 1
            and #value.requestId <= 64
            and value.requestId:match('^[A-Za-z0-9:_-]+$') ~= nil
        ))
        and type(value.retryable) == 'boolean'
end
