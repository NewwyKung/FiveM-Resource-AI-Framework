# Contributing

This is a hobby project released publicly to help FiveM developers work more consistently with AI. Contributions are welcome, but changes should keep the template small, provider-neutral, and easy to understand.

## Before contributing

1. Read `AGENTS.md` and `.ai/CONTEXT_BUDGET.md`.
2. Open or reference an issue for substantial behavior changes.
3. Do not add framework/provider bridges unless they are required by a working example or approved feature.
4. Do not add UI components, dependencies, or abstractions speculatively.

## Change categories

### AI rule

Use `.ai/rules/` for short mandatory constraints. Avoid tutorials and repeated explanations.

### AI skill

Use `.ai/skills/` for task workflows with clear inputs, steps, constraints, validation, and completion output.

### Recipe or example

Use `.ai/recipes/` for deterministic procedures and `.ai/examples/` for one concise executable pattern.

### Integration provider

Register external API knowledge under `.ai/integrations/providers/`. Documentation registration must not activate runtime integration. Never store secrets.

### Runtime code

Keep client, server, shared, config, UI transport, and persistence responsibilities separate. Remove unused adapters, dependencies, manifest entries, and placeholder files before completion.

## Validation

Run:

```bash
node scripts/validate-template.mjs
node scripts/validate-integrations.mjs
node scripts/build-ai-index.mjs --check
npm ci --prefix ui
npm run build --prefix ui
node tests/release/create-release.integration.mjs
```

FiveM-native behavior must still be tested on a real server when the change touches natives, entities, lifecycle, framework objects, or external resources.

## Commits

Prefer Conventional Commit-style messages:

```text
feat: add capability
fix: correct runtime behavior
docs: improve guidance
refactor: simplify implementation
test: add coverage
chore: maintain tooling
```

## Pull requests

Describe:

- the problem and intended outcome;
- files and runtime boundaries changed;
- validation performed;
- compatibility or migration impact;
- remaining limitations.

Keep pull requests focused. Unrelated formatting or refactors should be separated.
