# Task Context Packets

Use `.ai/work/current-task.md` for an active multi-step task or when work may move between AI models.

The packet is navigation state, not durable product memory.

## Lifecycle

1. Create from `TEMPLATE.md` after discovery or task classification.
2. List only files required for the current phase.
3. Update phase, decisions, acceptance criteria, and added-context reasons.
4. On completion, move durable decisions into requirements/registries.
5. Delete or reset `current-task.md`; do not archive chat transcripts here.

Small local edits do not require a task packet.
