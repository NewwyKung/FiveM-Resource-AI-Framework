# AI Context Budget

Use the smallest context that can complete the approved task safely.

## Default packet

Load:
- `AGENTS.md`
- one primary skill
- 1-4 domain rules
- one active requirements file when applicable
- one feature registry when applicable
- `.ai/memory/environment.md` only for capabilities used by the task
- selected provider profiles only
- affected source files only

## Limits by category

- Primary skills: 1 per implementation phase.
- Example patterns: maximum 1 unless the task genuinely spans separate patterns.
- Provider profiles: maximum 1 per capability used by the task.
- UI specifications: only the affected screen(s).
- Historical requirements: do not load unless resolving a regression, migration, or prior decision.
- Generated `resource/html/`: do not read for source implementation; inspect only for release/build validation.

## Avoid

- all rules at once
- all provider profiles
- all feature registries
- full external framework documentation
- delivered or superseded requirements unrelated to the current change
- raw chat transcripts
- copied source documentation already represented by a concise profile

## Escalation

Expand context only when the current packet cannot answer a material question. Record the added file and reason in `.ai/work/current-task.md` when a task packet is active.
