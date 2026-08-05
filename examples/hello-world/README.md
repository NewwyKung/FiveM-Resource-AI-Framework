# Hello World Event Flow

This standalone resource demonstrates:

```text
client command -> enum request envelope -> validated server event -> correlated response -> client output
```

It has no framework, database, library, or NUI dependency.

## Run

1. Copy or junction this folder into an FXServer resources category as `example_hello_world`.
2. Add `ensure example_hello_world` to `server.cfg`.
3. Join the server and run `/hello-world optional message` in the F8 console or chat.
4. Confirm the response includes the same request ID and that rapid requests return `RATE_LIMITED`.

The envelope uses `{ action, requestId, payload }`. `action` is checked against a string allowlist, and `requestId` is bounded before the payload is used.

Do not ship this example inside another resource. Adapt its contract and authority pattern instead.
