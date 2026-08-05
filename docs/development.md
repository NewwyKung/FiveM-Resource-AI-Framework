# Development and Contributions

This public hobby project accepts focused fixes and improvements without guaranteeing response or support times. Keep the template small, provider-neutral, and understandable.

## Before changing code

1. Read `AGENTS.md` and `.ai/CONTEXT_BUDGET.md`.
2. Use or reference an issue for substantial behavior changes.
3. Do not add provider bridges, UI dependencies, abstractions, or extension points without an approved working need.
4. Keep runtime boundaries separate and remove unused adapters, dependencies, manifest entries, and placeholders.

Use `.ai/rules/` for compact mandatory constraints, `.ai/skills/` for task workflows, `.ai/recipes/` for deterministic procedures, and `.ai/examples/` for concise patterns. Register provider knowledge without activating runtime code and never store credentials in provider profiles or AI memory.

## Reports and support

Use GitHub Issues for reproducible defects, documentation problems, or focused feature requests. Include the resource version, FXServer artifact, selected providers, reproduction steps, expected/actual behavior, last known good commit when available, and the smallest relevant log slice with secrets removed.

Use discussions for broad ideas or architecture questions when enabled. Search the READMEs, `docs/`, `TODO.md`, and existing issues first.

Report suspected vulnerabilities privately through an available repository-owner contact method rather than publishing exploitable details. Include affected version, minimal reproduction, and impact. Never publish API keys, webhooks, database credentials, private provider documentation, or player-sensitive logs.

## Validation and review

Install UI dependencies once, then run the repository aggregator:

```bash
npm ci --prefix resource/ui --no-audit --no-fund
npm run validate
```

Run `npm run check:lua` with the pinned LuaLS version when Lua changes. FiveM natives, lifecycle, player disconnects, entities, providers, and NUI focus still require real FXServer verification.

Prefer focused Conventional Commit-style messages such as `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, or `chore:`. Pull requests should describe the problem/outcome, changed runtime boundaries, validation evidence, compatibility or migration impact, and remaining limitations.
