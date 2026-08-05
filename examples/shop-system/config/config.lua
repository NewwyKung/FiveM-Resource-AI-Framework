ExampleShopConfig = {
    Command = 'example-shop',
    StartingBalance = 500,
    MaxQuantity = 10,
    MinimumRequestIntervalMs = 500,
    IdempotencyRetentionMs = 30000,
    MaxRememberedRequests = 32,
    Items = {
        water = { label = 'Water', price = 12 },
        sandwich = { label = 'Sandwich', price = 25 },
    },
}
