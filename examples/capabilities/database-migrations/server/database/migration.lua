---@class DatabaseMigrationAdapter
---@field Query fun(query: string, parameters?: table): table
---@field Single fun(query: string, parameters?: table): table?
---@field Transaction fun(queries: table): boolean

local Migration = {}

local TRACKING_TABLE = [[
CREATE TABLE IF NOT EXISTS resource_migrations (
    resource_name VARCHAR(64) NOT NULL,
    migration_id VARCHAR(128) NOT NULL,
    checksum VARCHAR(64) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (resource_name, migration_id)
)
]]

---@param database DatabaseMigrationAdapter
---@param resourceName string
function Migration.Create(database, resourceName)
    assert(type(database) == 'table', 'database adapter is required')
    assert(type(resourceName) == 'string' and resourceName ~= '', 'resource name is required')

    local runner = {}

    function runner.EnsureTrackingTable()
        database.Query(TRACKING_TABLE)
    end

    ---@param migrationId string
    ---@return table?
    function runner.GetApplied(migrationId)
        return database.Single(
            'SELECT migration_id, checksum FROM resource_migrations WHERE resource_name = ? AND migration_id = ?',
            { resourceName, migrationId }
        )
    end

    ---@param migrationId string
    ---@param checksum string
    ---@param statements string[]
    ---@return boolean success
    ---@return string? errorCode
    function runner.Apply(migrationId, checksum, statements)
        local applied = runner.GetApplied(migrationId)
        if applied then
            if applied.checksum ~= checksum then
                return false, 'MIGRATION_CHECKSUM_MISMATCH'
            end
            return true
        end

        local queries = {}
        for _, statement in ipairs(statements) do
            queries[#queries + 1] = { query = statement, values = {} }
        end

        queries[#queries + 1] = {
            query = 'INSERT INTO resource_migrations (resource_name, migration_id, checksum) VALUES (?, ?, ?)',
            values = { resourceName, migrationId, checksum },
        }

        local success = database.Transaction(queries)
        return success == true, success == true and nil or 'MIGRATION_FAILED'
    end

    return runner
end

return Migration
