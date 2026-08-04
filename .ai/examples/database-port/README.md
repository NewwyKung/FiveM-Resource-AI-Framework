# Database Port Example

Use when persistence is approved. This is a boundary pattern, not a custom ORM.

```text
feature service → repository → selected database driver
```

Feature modules call repositories, never `MySQL.*` or another driver directly.

```lua
local ShopRepository = {}

function ShopRepository.GetStock(shopId, itemName)
    return Database.Single(
        'SELECT stock FROM shop_stock WHERE shop_id = ? AND item_name = ?',
        { shopId, itemName }
    )
end

return ShopRepository
```

Minimum driver operations should be added only when used:

- `Query`
- `Single`
- `Scalar`
- `Insert`
- `Update`
- `Transaction`
- `Ready`

For tests, replace the driver with an in-memory fake. Do not build Active Record, model relations, or a query builder into this template.
