RuntimeTests.Register('config bootstrap preserves existing values', function()
    local config = { existing = true }
    config = config or {}
    config.enabled = config.enabled ~= false

    if config.existing ~= true then return false, 'bootstrap replaced existing config' end
    if config.enabled ~= true then return false, 'default was not applied' end
    return true
end)
