ExampleShopRepository = {}

local players = {}

local function getPlayer(playerId)
    players[playerId] = players[playerId] or {
        balance = ExampleShopConfig.StartingBalance,
        inventory = {},
    }
    return players[playerId]
end

---@param playerId number
---@param itemId string
---@param quantity number
---@param total number
---@return boolean success
---@return table|string result
function ExampleShopRepository.Purchase(playerId, itemId, quantity, total)
    local player = getPlayer(playerId)
    if player.balance < total then return false, 'INSUFFICIENT_FUNDS' end

    player.balance = player.balance - total
    player.inventory[itemId] = (player.inventory[itemId] or 0) + quantity

    return true, {
        balance = player.balance,
        itemCount = player.inventory[itemId],
    }
end

function ExampleShopRepository.DropPlayer(playerId)
    players[playerId] = nil
end

function ExampleShopRepository.Reset()
    players = {}
end
