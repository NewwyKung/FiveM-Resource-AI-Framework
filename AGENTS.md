# AI Working Agreement

## Project
Reusable FiveM resource template with Lua client/server/shared code and optional Svelte NUI.

## Source of truth
1. Repository files on the current working branch.
2. `docs/decisions/` for approved architecture decisions.
3. Approved `docs/ui-spec/` files and `docs/design/design-system.md` for UI decisions.
4. `.ai/rules/` for domain constraints.
5. `.ai/skills/` for task workflows.

## Repository map
- `config/`: editable configuration and config helpers.
- `shared/`: code safe for both client and server.
- `client/`: client-only modules and bootstrap.
- `server/`: server-only modules and bootstrap.
- `ui/`: Svelte NUI source.
- `html/`: generated NUI output; do not edit directly.
- `docs/design/`: persistent design-system, pipeline, sources, and review guidance.
- `docs/ui-spec/`: screen-level UI specifications.
- `docs/`: architecture decisions and project references.
- `tests/`: test code and fixtures.

## Context routing
Read only what the task needs:
- Any Lua/FiveM change: `.ai/rules/fivem.md`, `.ai/rules/lua.md`
- Config/module structure: `docs/decisions/001-config-architecture.md`, `docs/decisions/002-module-architecture.md`
- Security/network events: `.ai/rules/security.md`, `.ai/rules/fault-handling.md`
- Visual UI design/review: `.ai/rules/design.md`
- Svelte/NUI implementation: `.ai/rules/ui.md`
- Public exports/events/callbacks: `.ai/rules/api.md`
- Localization: `.ai/rules/localization.md`
- Assets: `.ai/rules/assets.md`
- Testing/release: `.ai/rules/testing.md`

Then read one matching skill from `.ai/skills/INDEX.md`.

## UI workflow routing
- New screen or major redesign: `design-ui` → approved screen spec → `implement-ui` → `review-ui` → `refine-ui`.
- Existing approved design: start at `implement-ui`.
- Existing implementation audit: start at `review-ui`.
- Small NUI transport/integration changes: use `create-nui` without loading the full design pipeline unless visuals change.

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
- Do not silently invent design tokens or override an approved screen specification.
- Do not replace interactive UI with a full-screen image or bake dynamic/localized text into raster assets.

## Standard workflow
1. Inspect relevant files, decisions, specifications, and existing patterns.
2. Identify runtime boundaries, design constraints, and risks.
3. State only material assumptions.
4. Implement the smallest coherent change.
5. Validate the affected paths and representative states.
6. Summarize changed files, validation, evidence, and remaining risks.

## Completion criteria
A task is incomplete when applicable checks were not run, representative states were not considered, or generated/runtime references are stale. Be explicit about checks that could not be executed.