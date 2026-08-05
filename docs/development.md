# Development

The contribution entrypoint is [`CONTRIBUTING.md`](../CONTRIBUTING.md). This document contains the detailed repository workflow.

## Before changing code

1. Read `AGENTS.md` and `.ai/CONTEXT_BUDGET.md`.
2. Use or reference an issue for substantial behavior changes.
3. Do not add provider bridges, UI dependencies, abstractions, or extension points without an approved working need.
4. Keep runtime boundaries separate and remove unused adapters, dependencies, manifest entries, and placeholders.
5. Follow [`SECURITY.md`](../SECURITY.md) for vulnerability reports and sensitive material.

Use `.ai/rules/` for mandatory constraints, `.ai/skills/` for task workflows, `.ai/recipes/` for deterministic procedures, and `.ai/examples/` for concise patterns.

## Initialize a new project

```bash
npm run init
```

For automation:

```bash
npm run init -- \
  --name my_resource \
  --author "Your Name" \
  --description "Resource description" \
  --framework standalone \
  --database none \
  --shared-library none
```

The initializer updates metadata and the confirmed server environment. Review every generated value before implementation.

## Connect to FXServer

```bash
npm run setup:dev -- \
  --resources "/path/to/server-data/resources/[local]" \
  --name my_resource
```

The script creates a directory link to the canonical `resource/` folder and refuses to replace a real directory. `--force` may replace only an existing symbolic link or junction.

The guarded PowerShell helper remains available for Windows.

## Reports and support

Use GitHub Issues for reproducible defects, documentation problems, or focused feature requests. Include the version, FXServer artifact, selected providers, reproduction steps, expected/actual behavior, last known good commit, and the smallest safe log slice.

## Validation

```bash
npm ci --prefix resource/ui --no-audit --no-fund
npm run validate
npm run check:lua
```

FiveM natives, lifecycle, player disconnects, entities, providers, and NUI focus still require real FXServer verification.

## Review and commits

Prefer focused Conventional Commit-style messages. Pull requests should describe the problem, runtime boundaries, validation evidence, compatibility impact, and remaining limitations.

Do not commit generated files under `resource/html/` or `release/`.
