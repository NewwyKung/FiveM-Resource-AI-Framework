RuntimeRegistrations = {}

local owners = {}

---@param kind string
---@param name string
---@param owner string
---@return boolean accepted
---@return string? existingOwner
function RuntimeRegistrations.Claim(kind, name, owner)
    assert(type(kind) == 'string' and kind ~= '', 'registration kind is required')
    assert(type(name) == 'string' and name ~= '', 'registration name is required')
    assert(type(owner) == 'string' and owner ~= '', 'registration owner is required')

    local key = ('%s:%s'):format(kind, name)
    if owners[key] then return false, owners[key] end
    owners[key] = owner
    return true
end

function RuntimeRegistrations.Clear()
    owners = {}
end

exports('ClaimRuntimeRegistration', RuntimeRegistrations.Claim)
