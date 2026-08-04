# Integration Rules

- Read `integrations.json` before integration work.
- Feature code calls capability contracts, never external exports/events directly.
- Keep provider selection in `integrations.json` and runtime selection in `config/config.integrations.lua` aligned.
- Split adapters by runtime when exports or options differ between client and server.
- Every provider contract must include an option matrix with types, required/default values, allowed runtimes, conditional rules, and dependencies.
- Reject options that are invalid for the current runtime instead of silently forwarding them.
- Validate required provider resources with `GetResourceState` before calling exports.
- Conditional features must validate their own dependencies; example: screenshot options may require `screenshot-basic`.
- Do not load documentation or source for providers that are not selected.
- Mark providers as verified only after representative runtime tests pass.
- Keep secrets and server-only provider objects out of shared/client configuration and payloads.
- Return stable capability-level error codes; do not leak provider-specific errors into feature contracts unless explicitly required.
- Add or update `.ai/integrations/providers/<provider>.md` whenever provider behavior changes.
