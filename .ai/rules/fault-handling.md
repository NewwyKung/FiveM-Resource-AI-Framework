# Fault-Handling Rules

Consider only relevant failure classes:
- network timeout/disconnect/out-of-order data
- invalid player/source/payload or event spam
- missing/deleted/unowned entities
- database timeout/deadlock/partial transaction
- resource restart or missing dependency
- leaked handlers/timers/pending callbacks
- NUI bridge failure or focus lock
- stale/racing state
- external API/file/permission failure

Required behavior:
- Validate before mutation.
- Use deadlines for awaited responses.
- Make transactions idempotent or rollback-safe.
- Clean pending work on player drop/resource stop.
- Bound retries with backoff; never retry forever.
- Degrade optional features without breaking the core resource.
- Log enough context to diagnose, without exposing secrets.
