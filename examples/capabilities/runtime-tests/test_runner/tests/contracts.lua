RuntimeTests.Register('request envelope accepts valid contract', function()
    local valid, errorCode = RuntimeTests.ValidateEnvelope(
        { requestId = 'test:1', action = 'ping', payload = {} },
        { ping = true }
    )
    return valid, errorCode
end)

RuntimeTests.Register('request envelope rejects invalid request ID', function()
    local valid, errorCode = RuntimeTests.ValidateEnvelope({ requestId = '', action = 'ping', payload = {} })
    if valid then return false, 'invalid request ID was accepted' end
    return errorCode == 'INVALID_REQUEST_ID', errorCode
end)

RuntimeTests.Register('request envelope rejects actions outside enum', function()
    local valid, errorCode = RuntimeTests.ValidateEnvelope(
        { requestId = 'test:2', action = 'admin', payload = {} },
        { ping = true }
    )
    if valid then return false, 'unsupported action was accepted' end
    return errorCode == 'INVALID_ACTION', errorCode
end)

RuntimeTests.Register('request envelope requires an object payload', function()
    local valid, errorCode = RuntimeTests.ValidateEnvelope({ requestId = 'test:3', action = 'ping' })
    if valid then return false, 'missing payload was accepted' end
    return errorCode == 'INVALID_PAYLOAD', errorCode
end)

RuntimeTests.Register('structured error accepts shared contract', function()
    return RuntimeTests.ValidateStructuredError({
        code = 'PROVIDER_UNAVAILABLE',
        messageKey = 'error.provider_unavailable',
        details = {},
        requestId = 'test:provider:1',
        retryable = true,
    }), 'valid structured error was rejected'
end)

RuntimeTests.Register('structured error rejects translated code', function()
    local valid = RuntimeTests.ValidateStructuredError({
        code = 'Provider unavailable',
        messageKey = 'error.provider_unavailable',
        details = {},
        retryable = false,
    })
    return not valid, 'human-readable error code was accepted'
end)
