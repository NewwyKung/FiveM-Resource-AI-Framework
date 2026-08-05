---@class MigrationDatabaseOperations
---@field Query fun(query: string, parameters?: table): table
---@field Single fun(query: string, parameters?: table): table?
---@field Transaction fun(queries: table): boolean

local MigrationDatabaseAdapter = {}

---@param operations MigrationDatabaseOperations
---@return MigrationDatabaseOperations
function MigrationDatabaseAdapter.Create(operations)
    assert(type(operations) == 'table', 'migration database operations are required')

    for _, operation in ipairs({ 'Query', 'Single', 'Transaction' }) do
        assert(type(operations[operation]) == 'function', ('migration database adapter is missing %s'):format(operation))
    end

    return {
        Query = operations.Query,
        Single = operations.Single,
        Transaction = operations.Transaction,
    }
end

return MigrationDatabaseAdapter
