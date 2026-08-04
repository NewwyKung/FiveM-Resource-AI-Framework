# Project Memory

Store concise, durable project facts that are not obvious from source code.

## Files
- `project-style.md`: stable product and visual preferences.
- `known-problems.md`: confirmed recurring problems and workarounds.
- `decision-log.md`: compact index linking approved ADRs.

## Rules
- Do not store chat transcripts or speculative notes.
- Prefer links to source files and ADRs over duplicated explanations.
- Remove stale entries when the source of truth changes.
- Agents read memory only when the task needs historical project context.
