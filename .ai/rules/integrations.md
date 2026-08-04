# Integration Rules

- Read `.ai/memory/environment.md` and `integrations.json` before activation work.
- Registering supplied documentation does not approve or activate runtime integration.
- Feature code calls a stable capability contract; direct external exports/events stay inside the selected adapter.
- `integrations.json` is the single source of truth for selected providers.
- Create runtime config and adapters only when an approved feature needs them.
- Split adapters by runtime when exports, arguments, options, dependencies, or return behavior differ between client and server.
- Every provider profile must include operation signatures and an option matrix with types, required/default values, allowed runtimes, conditional rules, dependencies, and failure behavior.
- Reject invalid runtime options instead of forwarding them silently.
- Validate required resources with `GetResourceState` before calling provider APIs.
- Conditional options validate their own dependencies.
- Do not load documentation or source for providers that are not selected for the task.
- Mark providers verified only after representative runtime tests pass against the documented version.
- Keep secrets and server-only provider objects out of shared/client configuration and payloads.
- Return stable capability-level error codes unless provider-specific errors are explicitly part of the approved contract.
- Update `.ai/integrations/providers/<provider>.md` when provider behavior changes.
- After implementation, remove unused adapters, configs, dependencies, manifest entries, and copied examples. Keep concise registered provider profiles because they have no runtime cost.
