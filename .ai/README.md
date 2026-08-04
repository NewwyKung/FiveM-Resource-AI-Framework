# AI System

This directory provides model-neutral, token-efficient project context.

## Load order
1. Read root `AGENTS.md`.
2. Read one or more relevant files from `.ai/rules/`.
3. Read the matching primary skill from `.ai/skills/`.
4. Read only the relevant registries, specifications, memory, and source files.
5. Run the applicable checklist before completion.

## Directories
- `rules/`: short domain constraints.
- `skills/`: task workflows.
- `features/`: feature ownership and file maps.
- `components/`: reusable UI component contracts.
- `events/`: events, callbacks, exports, and authority contracts.
- `database/`: table/data-store ownership and schema summaries.
- `memory/`: stable project history and known problems.
- `knowledge/`: repository-specific technical knowledge.
- `prompts/`: short reusable task entrypoints.
- `checklists/`: completion and release gates.
- `examples/`: approved examples loaded only when relevant.

## Token policy
- Do not load every rule, skill, or registry by default.
- Prefer indexes and exact paths.
- Link to source files instead of copying code into documentation.
- Keep registry records compact and update them with contract changes.
