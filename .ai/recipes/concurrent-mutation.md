# Concurrent Mutation Recipe

Use this recipe for economic, inventory, ownership, or persistent state that multiple players/processes may change.

| Risk | Required handling |
|---|---|
| Duplicate request | Server-scoped idempotency key with bounded retention; return the prior result |
| Stale response | Correlation ID and client check against the currently pending operation |
| Optimistic UI | Snapshot before mutation and roll back on rejection/timeout; never treat optimism as authority |
| Ordering | Re-read authoritative state immediately before commit; serialize or transact conflicting writes |
| Ownership change | Validate entity/player ownership at execution time, not only at intent time |
| Disconnect | Cancel or safely finish by server policy, then clear player-scoped locks and pending state |
| Transaction failure | Commit all related writes atomically and return a stable non-sensitive error |

## Provider-neutral flow

1. Client sends intent with a request ID and idempotency key.
2. Server validates source, payload, permission, limits, and current ownership/state.
3. Service checks the bounded idempotency store and acquires a feature-local lock or starts a database transaction.
4. Repository applies the mutation and related audit write atomically.
5. Server stores and returns the correlated result, then releases locks in every success/failure/disconnect path.
6. Client ignores stale responses and reconciles optimistic state with the authoritative result.

## Choose state transport

| Need | Prefer |
|---|---|
| Replicated low-frequency entity/player property | State bag, with server ownership rules |
| One-way transient notification | Event |
| Request/response with bounded wait | Callback or correlated events |
| Durable cross-restart state | Feature repository through selected database adapter |
| UI-only pending/loading/error state | Feature-local NUI state |

Do not introduce a global state framework for one mutation path.
