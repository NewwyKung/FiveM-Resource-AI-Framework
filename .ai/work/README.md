# Task Context Packets

Use `.ai/work/current-task.md` for an active multi-step task or when work may move between AI models.

The packet is navigation state, not durable product memory.

## Lifecycle

1. Create from `TEMPLATE.md` after discovery or task classification.
2. Use the string enums and shape in `docs/schemas/ai-task.schema.json`.
3. Map `characteristics` IDs to `.ai/matrices/quality-gates.json` and load only matching guidance.
4. List only files required for the current phase.
5. Keep scope and acceptance criteria explicit; enum IDs never replace task-specific behavior.
6. Update phase, references, acceptance criteria, and added-context reasons.
7. On completion, move durable decisions into requirements/registries.
8. Delete or reset `current-task.md`; do not archive chat transcripts here.

Small local edits do not require a task packet.
