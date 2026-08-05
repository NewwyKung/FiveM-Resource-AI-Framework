# AI Reference Map

The source guides were distilled into compact rules and skills to avoid loading thousands of lines for every task.

| Source topic | Repository guidance |
|---|---|
| Resource architecture and layered boundaries | `AGENTS.md`, `.ai/rules/fivem.md`, ADR-001, ADR-002 |
| Lua best practices and optimization | `.ai/rules/lua.md` |
| Fault cases and operational recovery | `.ai/rules/fault-handling.md` |
| Security and trusted authority | `.ai/rules/security.md` |
| Svelte/FiveM NUI | `.ai/rules/ui.md`, `create-nui` skill |
| Public exports/events/callbacks | `.ai/rules/api.md` |
| Testing and QA | `.ai/rules/testing.md` |
| High-risk boundary contracts | `.ai/rules/contracts.md`, `docs/schemas/` |
| Concurrent mutations and race conditions | `.ai/recipes/concurrent-mutation.md` |
| Asset optimization/streaming | `.ai/rules/assets.md` |
| Localization | `.ai/rules/localization.md` |
| Developer workflows | `.ai/skills/INDEX.md` |
| Task enums and lazy context references | `docs/schemas/ai-task.schema.json`, `.ai/work/TEMPLATE.md` |
| Architecture selection | `.ai/matrices/architecture-tiers.json` |
| Source precedence and volatile claims | `.ai/rules/source-trust.md` |
| Native FiveM UI routing | `.agents/skills/fivem-ui-workflow/SKILL.md` |
| Optional UI tools and design lenses | `.ai/matrices/ui-tool-routing.json` |
| Deterministic UI practice checks | `scripts/check-ui-practices.mjs` |
| Cross-agent discovery and compatibility | `docs/ai-agents.md`, `.ai/matrices/agent-entrypoints.json` |
| Deterministic agent adapter checks | `scripts/validate-agent-adapters.mjs` |

## Context policy
Agents should read `AGENTS.md`, one relevant rule set, one primary skill, and only the affected source files. The long-form guides are reference material, not mandatory context for every task.

## Duplication audit

The framework-hardening pass removed seven overlapping root documents and replaced only the still-required contribution/support/security-report guidance with one focused `docs/development.md`. Architecture remains canonical in ADRs, `.ai/features/resource-structure.md`, and the README; unresolved work remains only in `TODO.md`; release/security mechanics remain in `docs/releasing.md` and compact rules. This is a concrete reduction of six documentation files without claiming an estimated context-saving percentage.
