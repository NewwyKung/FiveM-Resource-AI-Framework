# Contributing

Focused fixes and improvements are welcome. This is a public hobby project, so response and support times are not guaranteed.

## Before contributing

1. Read `AGENTS.md` and `.ai/CONTEXT_BUDGET.md`.
2. Search existing issues and pull requests.
3. Use or reference an issue for substantial behavior, architecture, provider, or UI changes.
4. Keep the template provider-neutral and avoid speculative abstractions or runtime bridges.
5. Never include credentials, private provider documentation, or player-sensitive data.

See [`docs/development.md`](docs/development.md) for the detailed development workflow.

## Set up

```bash
npm ci --prefix resource/ui --no-audit --no-fund
npm run validate
```

When Lua changes, also run `npm run check:lua`. FiveM natives, lifecycle behavior, disconnect handling, provider behavior, entities, and NUI focus require real FXServer verification.

## Pull requests

Use a focused branch and Conventional Commit-style messages such as `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, or `chore:`.

A pull request should explain the problem and outcome, affected runtime boundaries, validation and runtime evidence, compatibility or migration impact, and remaining limitations.

Generated files under `resource/html/` and `release/` must not be committed.

## Security

Follow [`SECURITY.md`](SECURITY.md). Do not disclose exploitable vulnerabilities in public issues.
