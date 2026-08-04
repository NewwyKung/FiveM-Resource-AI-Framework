# FiveM Rules

- Keep `resource/client/`, `resource/server/`, `resource/shared/`, `resource/config/`, and `resource/ui/` responsibilities separate.
- Use `resource/fxmanifest.lua` as the visible load-order authority.
- Load foundations before modules and bootstrap `main.lua` last.
- Use shared scripts only for code/config safe to send to clients.
- Namespace network events, callbacks, state keys, and exports by resource.
- Clean up focus, entities, handlers, state, and pending work on resource stop.
- Avoid permanent zero-delay loops; adapt wait intervals to proximity/activity.
- Check entity existence and network ownership before mutation.
- Prefer state bags for durable replicated state where appropriate.
- Declare real dependencies; optional integrations must fail gracefully.
- Production `ui_page` must target built files, not localhost.
