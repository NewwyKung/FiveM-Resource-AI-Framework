RuntimeTests.Register('duplicate registration is detected', function()
    RuntimeRegistrations.Clear()
    local accepted = RuntimeRegistrations.Claim('event', 'example:request', 'contracts-test')
    if not accepted then return false, 'first registration was rejected' end

    local duplicate, owner = RuntimeRegistrations.Claim('event', 'example:request', 'duplicate-test')
    RuntimeRegistrations.Clear()
    return duplicate == false and owner == 'contracts-test', owner
end)
