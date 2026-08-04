# Project Memory

Store concise, durable project facts and approved requirements that are not reliably recoverable from source code alone.

## Files
- `project-style.md`: stable product, code, and visual preferences.
- `known-problems.md`: confirmed recurring problems and workarounds.
- `requirements/<resource-or-feature>.md`: discovery output and approved implementation briefs.
- `requirements/TEMPLATE.md`: required structure for resource and feature requirements.

## Requirements lifecycle

```text
Discovery
→ Proposed brief
→ User approval or authorization of recommended defaults
→ Approved
→ Implementing
→ Delivered
→ Superseded when replaced
```

Approved requirements are a source of truth. When implementation needs to differ, record the deviation and obtain approval rather than silently changing product behavior.

## Rules
- Do not store raw chat transcripts; capture decisions, rationale, constraints, and approval.
- Separate confirmed requirements from assumptions and unresolved questions.
- Record rejected alternatives when they matter to future work.
- Prefer links to feature registries, UI specs, source files, and ADRs over duplicated implementation detail.
- Update the requirements file when approved behavior changes.
- Remove or mark stale entries when superseded.
- Do not store secrets, credentials, personal data, or temporary debugging output.
- Agents read only the relevant memory file for the current task.
