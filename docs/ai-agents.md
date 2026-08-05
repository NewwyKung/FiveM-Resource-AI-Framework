# Coding Agent Compatibility

This repository uses `AGENTS.md` as the only canonical project agreement. Vendor files are thin discovery adapters; they must not copy the agreement or create a second workflow.

## Configured Coding Surfaces

| Agent | Automatic entrypoint | Project skills | Verify after opening the repository |
|---|---|---|---|
| GPT / OpenAI Codex | `AGENTS.md` | `.agents/skills/` | Start a new task at the repository root and inspect loaded project instructions. |
| Claude Code | `CLAUDE.md` imports `AGENTS.md` | UI router is referenced lazily from `CLAUDE.md`; external plugins remain optional | Run `/context`. |
| Gemini CLI | `.gemini/settings.json` discovers `GEMINI.md` and `AGENTS.md`; this repository supplies only `AGENTS.md` | Use `.ai/skills/INDEX.md` as the workflow index | Run `/memory show` and confirm repository instructions do not hide user-level memory. |
| Cursor | `AGENTS.md` | Use `.ai/skills/INDEX.md` as the workflow index | Inspect active project rules. |
| GitHub Copilot | `AGENTS.md` where supported; `.github/copilot-instructions.md` supplies a compact safety fallback | `.agents/skills/` only where the active Copilot surface supports agent skills | Inspect active instructions using the controls available in that CLI or IDE surface. |
| Kimi Code | `AGENTS.md` | `.agents/skills/` | Start at the repository root and ask Kimi to identify the active agreement. |

These adapters target coding-agent, CLI, IDE, and repository-agent surfaces. A general web chat that has not opened the repository cannot discover local instructions automatically; attach the repository or explicitly provide `AGENTS.md`.

The matrix records configuration and static repository checks, not proof that every vendor runtime loaded the files. Until a row contains a tested version and runtime verification date, treat its `static-only` status as requiring the manual check shown in that row. Copilot support differs between CLI and IDE surfaces, so the fallback repeats only the minimum safety bootstrap rather than the full agreement.

## Shared Workflow

Every agent should follow the same bounded route:

```text
vendor entrypoint
-> AGENTS.md
-> .ai/CONTEXT_BUDGET.md
-> one primary skill
-> relevant rules and approved requirements only
-> affected source files
-> deterministic validation
```

Do not install model-specific APIs, MCP servers, plugins, hooks, or credentials merely to make the template compatible. Those capabilities remain opt-in and must be approved for the task that requires them.

## UI Notes

- `.agents/skills/fivem-ui-workflow/SKILL.md` is the canonical UI router for agents that discover project skills natively.
- Claude reads that router lazily through `CLAUDE.md`; the official `frontend-design` plugin is optional and does not replace repository approvals or Svelte/FiveM contracts.
- Agents without native project-skill discovery read `.ai/skills/INDEX.md`, then exactly one matching phase skill.
- Browser clicks, animation playback, CEF profiling, 4K rendering, and FXServer resmon require actual runtime evidence regardless of the model used.

## Maintenance

Run `npm run check:agents` and the adapter integration test after changing an adapter. Update `.ai/matrices/agent-entrypoints.json` only after verifying current primary documentation, and record a tested version/date only after running the stated smoke test because vendor discovery conventions can change.
