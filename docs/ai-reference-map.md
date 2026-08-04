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
| Asset optimization/streaming | `.ai/rules/assets.md` |
| Localization | `.ai/rules/localization.md` |
| Developer workflows | `.ai/skills/INDEX.md` |

## Context policy
Agents should read `AGENTS.md`, one relevant rule set, one primary skill, and only the affected source files. The long-form guides are reference material, not mandatory context for every task.
