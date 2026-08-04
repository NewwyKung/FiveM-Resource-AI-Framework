# AI Working Agreement

## Project
Reusable FiveM resource template with Lua client/server/shared code and optional Svelte NUI.

## Source of truth
1. Repository files on the current working branch.
2. Approved requirements under `.ai/memory/requirements/`.
3. `docs/decisions/` for approved architecture decisions.
4. `integrations.json` for selected external capability providers.
5. Approved `docs/ui-spec/` files and `docs/design/design-system.md` for UI decisions.
6. `.ai/rules/` for domain constraints.
7. `.ai/skills/` for task workflows.
8. Registries under `.ai/features/`, `.ai/components/`, `.ai/events/`, `.ai/database/`, and `.ai/integrations/` for navigation and contracts.

## Repository map
- `config/`: editable configuration and config helpers.
- `shared/`: code safe for both client and server.
- `client/`: client-only modules and bootstrap.
- `server/`: server-only modules and bootstrap.
- `ui/`: Svelte NUI source.
- `html/`: generated NUI output; do not edit directly.
- `integrations.json`: machine-readable selected providers and adapter paths.
- `docs/design/`: design system, pipeline, sources, and review guidance.
- `docs/ui-spec/`: screen-level wireframes and visual specifications.
- `.ai/integrations/`: concise capability/provider contracts and runtime option matrices.
- `.ai/memory/requirements/`: approved resource and feature briefs.
- `.ai/memory/`: concise durable project context.
- `.ai/knowledge/`: repository-specific technical knowledge.
- `.ai/prompts/`: short task entrypoints.
- `.ai/checklists/`: discovery and completion gates.
- `tests/`: test code and fixtures.

## Discovery gate
For a new resource, feature, redesign, provider integration, or materially ambiguous change, use `.ai/skills/discover-requirements/SKILL.md` before implementation.

A request such as “make a shop system” is not implementation-ready. Clarify and help design the outcome, scope, flows, permissions, authority, data, configuration, integrations, UI, failures, security, tests, and acceptance criteria. Offer concrete options and a recommended default instead of asking the user to invent the architecture alone.

Do not modify production code until:
- the requirements brief is stored under `.ai/memory/requirements/`;
- the feature registry is created or updated;
- material decisions are resolved;
- the user approves the brief or explicitly authorizes the recommended defaults.

Discovery may be abbreviated only for a truly local, low-risk edit whose intent and impact are already explicit.

## Context routing
Read only what the task needs:
- Any Lua/FiveM change: `.ai/rules/fivem.md`, `.ai/rules/lua.md`
- Config/module structure: `docs/decisions/001-config-architecture.md`, `docs/decisions/002-module-architecture.md`
- External framework/lib/resource integration: `integrations.json`, `.ai/rules/integrations.md`, selected provider contract only
- Security/network events: `.ai/rules/security.md`, `.ai/rules/fault-handling.md`
- Visual UI design/review: `.ai/rules/design.md`
- Svelte/NUI implementation: `.ai/rules/ui.md`
- Public exports/events/callbacks: `.ai/rules/api.md`
- Localization: `.ai/rules/localization.md`
- Assets: `.ai/rules/assets.md`
- Testing/release: `.ai/rules/testing.md`

Read the approved requirements and relevant feature/contract registry, then read one matching implementation skill from `.ai/skills/INDEX.md`.

## Integration workflow routing
- Read `integrations.json` before any provider work.
- Add or change providers through `.ai/skills/add-integration/SKILL.md`.
- Feature code calls capability contracts under `Integrations`; it must not call provider exports/events directly.
- Split adapters by runtime when client/server availability or option rules differ.
- Load only the selected provider document and affected runtime adapter.
- Provider contracts must document option type, required/default value, runtime, conditions, dependencies, and failure behavior.

## UI workflow routing
- New screen or major redesign: discovery → `wireframe-ui` → wireframe approval → `design-ui` → visual approval → `implement-ui` → `review-ui` → `refine-ui`.
- Existing approved wireframe needing visual direction: start at `design-ui`.
- Existing approved visual specification: start at `implement-ui`.
- Existing implementation audit: start at `review-ui`.
- Small NUI transport/integration changes: use `create-nui` unless visuals change.

## Core invariants
- Work on the requested branch; never assume the default branch.
- Make the smallest complete change and avoid unrelated edits.
- Do not edit generated files under `html/`.
- Keep client, server, shared, config, and UI responsibilities separate.
- Treat all client input as untrusted; authoritative decisions belong on the server.
- `main.lua` files are bootstraps, not business-logic containers.
- Do not introduce a custom loader when `fxmanifest.lua` can express the load order.
- Reuse existing modules/components before creating new ones.
- Do not add dependencies without a concrete need.
- Preserve backward compatibility for public APIs unless a breaking change is explicitly approved.
- Keep requirements, feature, component, event, database, integration, and resource metadata current when contracts change.
- Do not silently invent product behavior, provider behavior, design tokens, or architecture.
- Do not replace interactive UI with a full-screen image or bake dynamic/localized text into raster assets.

## Standard workflow
1. Determine whether discovery is required.
2. Inspect relevant files, memory, registries, decisions, specifications, selected integrations, and existing patterns.
3. Resolve and approve material requirements before code changes.
4. Identify runtime boundaries, authority, design constraints, provider option rules, and risks.
5. Implement the smallest coherent approved change.
6. Validate affected paths and representative states.
7. Run the applicable checklist.
8. Update requirements and registries when approved behavior changes.
9. Summarize changed files, validation, evidence, and remaining risks.

## Completion criteria
A task is incomplete when required discovery or approval is missing, applicable checks were not run, memory/registries/specifications are stale, provider runtime rules are undocumented, representative states were not considered, or generated/runtime references are stale. Be explicit about checks that could not be executed.
