HelloWorldContracts = {
    RequestEvent = 'example_hello_world:request',
    ResultEvent = 'example_hello_world:result',
    Actions = {
        Hello = 'hello',
    },
}

---@param envelope unknown
---@return string?
function HelloWorldContracts.GetRequestId(envelope)
    if type(envelope) ~= 'table' or type(envelope.requestId) ~= 'string' then return nil end
    if #envelope.requestId < 1 or #envelope.requestId > 64 then return nil end
    if not envelope.requestId:match('^[A-Za-z0-9:_-]+$') then return nil end
    return envelope.requestId
end

---@param envelope unknown
---@return boolean valid
---@return string? errorCode
function HelloWorldContracts.ValidateRequest(envelope)
    if type(envelope) ~= 'table' then return false, 'INVALID_PAYLOAD' end
    if envelope.action ~= HelloWorldContracts.Actions.Hello then
        return false, 'INVALID_ACTION'
    end
    if not HelloWorldContracts.GetRequestId(envelope) then
        return false, 'INVALID_REQUEST_ID'
    end
    if type(envelope.payload) ~= 'table' then return false, 'INVALID_PAYLOAD' end
    if envelope.payload.message ~= nil
        and (type(envelope.payload.message) ~= 'string' or #envelope.payload.message > 120) then
        return false, 'INVALID_MESSAGE'
    end
    return true
end
