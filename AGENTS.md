# AI Working Agreement

## Project
Reusable FiveM resource template with Lua client/server/shared code and optional Svelte NUI.

## Source of truth
1. Repository files on the current working branch.
2. Active approved requirements under `.ai/memory/requirements/active/`.
3. Confirmed server environment in `.ai/memory/environment.md`.
4. `docs/decisions/` for approved architecture decisions.
5. Registered provider profiles under `.ai/integrations/providers/` and selected providers in `integrations.json`.
6. Approved `docs/ui-spec/` files and `docs/design/design-system.md` for UI decisions.
7. `.ai/rules/`, `.ai/skills/`, and registries for domain guidance and navigation.

## Repository map
- `config/`: editable configuration and config helpers.
- `shared/`: code safe for both client and server.
- `client/`: client-only modules and bootstrap.
- `server/`: server-only modules and bootstrap.
- `ui/`: Svelte NUI source.
- `html/`: ignored generated NUI output; build it, never edit or commit it.
- `integrations.json`: selected provider metadata; it does not activate runtime code by itself.
- `examples/resources/`: runnable examples not loaded by the template resource.
- `examples/capabilities/`: optional i18n, migration, and runtime-test packs loaded only when selected.
- `.ai/examples/`: concise patterns loaded only when relevant.
- `.ai/integrations/`: provider profiles and integration templates.
- `.ai/memory/environment.md`: confirmed framework, database, libraries, and server-wide providers.
- `.ai/memory/requirements/`: active, delivered, and superseded requirement memory.
- `.ai/work/`: optional task context packet for multi-step or cross-model work.
- `.ai/CONTEXT_BUDGET.md`: shared context-loading limits.
- `.ai/index.json`: generated registry path index.
- `tests/`: test code, fixtures, and executable test plans.

## Discovery gate
For a new resource, feature, redesign, provider integration, or materially ambiguous change, use `.ai/skills/discover-requirements/SKILL.md` before implementation.

A vague request such as “make a shop system” is not implementation-ready. Clarify and help design outcome, scope, flows, permissions, authority, data, configuration, UI, failures, tests, and required environment capabilities.

Before implementation, inspect `.ai/memory/environment.md`. If required information is unresolved, ask which framework, shared libraries, database/oxmysql usage, inventory, money, notify, logger, progress, target, and custom resources are needed. Ask only about capabilities relevant to the current task. Save confirmed server-wide choices so they are not requested repeatedly.

Do not modify production code until requirements and material environment decisions are approved.

## Context routing
Always apply `.ai/CONTEXT_BUDGET.md`.

Read only what the task needs:
- Lua/FiveM: `.ai/rules/fivem.md`, `.ai/rules/lua.md`
- Config/modules: approved ADRs under `docs/decisions/`
- Environment/integrations: `.ai/memory/environment.md`, `integrations.json`, `.ai/rules/integrations.md`, selected provider profile only
- Database boundary: `.ai/examples/database-port/README.md` only when persistence is required
- Framework/resource adapter: `.ai/examples/adapter-pattern/README.md` only when a provider is activated
- Optional i18n: `examples/capabilities/i18n/README.md` only when multiple locales are approved
- Optional migrations: `examples/capabilities/database-migrations/README.md` only when the resource owns database schema
- Optional FXServer tests: `examples/capabilities/runtime-tests/README.md` only when selected or runtime behavior cannot be covered otherwise
- Security/events: `.ai/rules/security.md`, `.ai/rules/fault-handling.md`
- UI: `.ai/rules/design.md`, `.ai/rules/ui.md`, relevant UI skill/specification
- Testing/release: `.ai/rules/testing.md`, applicable checklist

For multi-step or cross-model work, create `.ai/work/current-task.md` from `.ai/work/TEMPLATE.md`. The packet lists the exact files to read and files to avoid. It is temporary navigation state, not durable memory.

## Integration workflow
- Register supplied provider docs once through `.ai/skills/add-integration/SKILL.md` in Register mode.
- Registration creates a concise provider profile; it does not write runtime code.
- Activate a provider only when an approved feature requires it.
- Implement only the operations and runtimes required by approved features.
- Provider calls stay inside selected adapters; feature code uses a stable capability contract.
- Do not generate ESX, QBCore, Qbox, oxmysql, notify, logger, progress, inventory, or target bridges speculatively.

## UI workflow
New screen or major redesign:

`discovery → wireframe-ui → approval → design-ui → approval → implement-ui → review-ui → refine-ui`

## Core invariants
- Work on the requested branch; never assume it.
- Make the smallest complete change and avoid unrelated edits.
- Do not edit or commit generated files under `html/`.
- Keep client, server, shared, config, UI, and provider responsibilities separate.
- Treat client input as untrusted; authoritative decisions belong on the server.
- `main.lua` files are bootstraps, not business-logic containers.
- Do not add dependencies or adapters without an approved need.
- Do not silently invent product, provider, or architecture behavior.
- Keep requirements and registries current when contracts change.

## Standard workflow
1. Determine whether discovery is required.
2. Read relevant active requirements, environment profile, registries, decisions, specifications, and source.
3. Create/update a task packet when the task is multi-step or may move between models.
4. Resolve missing framework/library/database/integration choices required by the task.
5. Approve requirements and selected defaults.
6. Implement the smallest coherent change.
7. Validate success, failure, disconnect, restart, and relevant security cases.
8. Run applicable checklists and CI validations.
9. Update memory, registries, provider profiles, specifications, and `.ai/index.json`.
10. Move delivered or superseded requirements to the matching lifecycle folder.
11. Remove unused adapters, configs, dependencies, manifest entries, copied examples, generated output, and dead files.
12. Clear the task packet after durable decisions are stored.
13. Summarize changes, evidence, checks not run, and remaining risks.

## Completion criteria
A task is incomplete when required discovery is missing, relevant environment choices remain unresolved, unused generated bridges remain, applicable checks were not run, registries/index are stale, or runtime/generated references are invalid.
