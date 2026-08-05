# FiveM Rules

- Keep `resource/client/`, `resource/server/`, `resource/shared/`, `resource/config/`, and `resource/ui/` responsibilities separate.
- Use `resource/fxmanifest.lua` as the visible load-order authority.
- Load foundations before modules and bootstrap `main.lua` last.
- Use shared scripts only for code/config safe to send to clients.
- Namespace network events, callbacks, state keys, and exports by resource.
- Use `AddEventHandler` for same-context events. Use `RegisterNetEvent` only when an event must cross the client/server boundary, then validate its source and payload.
- Copy the global server `source` into a local before any `Wait`, promise, callback continuation, or await because `source` is not stable after yielding.
- Clean up focus, entities, handlers, state, and pending work on resource stop.
- Avoid permanent zero-delay loops; adapt wait intervals to proximity/activity.
- Treat entity handles as runtime-local and network IDs as transient, reusable identifiers that may not be in a client's scope. Check existence, scope, and ownership at mutation time.
- Use state bags only for low-frequency replicated properties whose ownership semantics fit. State bags serialize shallowly, so set direct keys and treat client-written values as untrusted.
- Declare real dependencies; optional integrations must fail gracefully.
- Production `ui_page` must target built files, not localhost.
- FiveM already runs Lua 5.4; do not add the deprecated `lua54 'yes'` manifest flag.
- One Argument List (OAL) is an opt-in native invocation mode, not OneSync. Enable it only after native/vector compatibility checks and measurement.
