# Security Rules

- Treat every client payload, NUI callback, event, and state change as untrusted.
- Server validates source, permissions, ownership, type, range, distance, price, state, and replay/rate limits.
- Never let the client choose authoritative rewards, balances, inventory outcomes, or identities.
- Keep secrets and privileged configuration in server-only files.
- Use parameterized database queries and transactions for multi-step writes.
- Namespace and rate-limit exploitable network endpoints.
- Return consistent public errors; keep sensitive internal errors in server logs.
- Validate resource/entity existence before acting on handles or network IDs.
- Audit sensitive operations with actor, action, reason, and result.
- Do not add cosmetic anti-debug measures as a substitute for server authority.
