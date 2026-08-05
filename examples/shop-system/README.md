# Provider-Neutral Shop System

This standalone example demonstrates config ownership, a string-enum request envelope, NUI timeout/focus cleanup, server validation, rate limiting, bounded per-player idempotency, a transactional repository boundary, and optional provider replacement.

The default repository is in-memory so the example runs without a framework or database. It atomically updates an example balance and inventory table. Replace only `server/adapters/repository.lua` when persistence, economy, or inventory providers are approved.

## Run

1. Copy or junction this folder into FXServer resources as `example_shop_system`.
2. Add `ensure example_shop_system` to `server.cfg`.
3. Join and run `/example-shop`.
4. Purchase an item, verify the correlated result, close with Escape, then restart the resource and confirm focus is released.

## Optional capabilities

- Persistence: adapt `examples/capabilities/database-migrations/` only when this resource owns schema.
- Localization: adapt `examples/capabilities/i18n/` only when multiple locales are approved.
- External inventory/money/notify/logger: register provider docs first, then replace the matching adapter operations only.

The server never accepts client-selected price, balance, identity, or reward values. A repeated request ID returns its remembered result instead of applying the purchase twice; retention is intentionally bounded by time and count.
