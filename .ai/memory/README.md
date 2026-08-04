# Project Memory

Store concise, durable project facts and approved requirements that are not reliably recoverable from source code alone.

## Files
- `project-style.md`: stable product, code, and visual preferences.
- `known-problems.md`: confirmed recurring problems and workarounds.
- `environment.md`: confirmed server-wide framework, database, libraries, and integrations.
- `requirements/active/<feature>.md`: Discovery, Proposed, Approved, or Implementing briefs.
- `requirements/delivered/<feature>.md`: completed requirements used for maintenance/regression context.
- `requirements/superseded/<feature>.md`: replaced decisions used only for history/migration analysis.
- `requirements/TEMPLATE.md`: required structure for a new active requirement.

## Lifecycle

```text
Discovery → Proposed → Approved → Implementing → Delivered
                                           ↘ Superseded
```

Move one requirements file between lifecycle folders; do not duplicate it. Read `active/` first. Load delivered or superseded history only when the current task needs it.

## Rules
- Do not store raw chat transcripts; capture decisions, rationale, constraints, and approval.
- Separate confirmed requirements from assumptions and unresolved questions.
- Record rejected alternatives only when they matter to future work.
- Prefer links to registries, UI specs, source files, provider profiles, and ADRs over duplicated implementation detail.
- Update and move the requirements file when approved behavior or status changes.
- Do not store secrets, credentials, personal data, or temporary debugging output.
- Agents read only the memory file relevant to the current task.
- Temporary task navigation belongs in `.ai/work/current-task.md`, not durable memory.
