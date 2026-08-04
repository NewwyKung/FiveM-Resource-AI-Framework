# Engineering Quality Rules

Load this rule for implementation, review, debugging, and release work.

## Architecture

- Use the smallest approved architecture tier.
- Keep transport handlers thin; business decisions belong in services/use cases.
- Add repositories only when persistence exists.
- Access external resources through the selected provider boundary, never scattered direct calls.

## Authority and validation

- The client sends intent; the server decides economic, inventory, permission, ownership, and persistent outcomes.
- Bound all external inputs by type, length, enum, range, count, and rate where relevant.
- Re-read authoritative state immediately before mutation.
- Use stable result and error contracts.

## Lifecycle

- Every retained listener, timer, callback, entity, focus state, and per-player table needs an owner and cleanup path.
- Handle `playerDropped`, dependency stop, and `onResourceStop` when the feature retains related state.
- Keep caches and pending requests bounded and expiring.

## Performance

- Every loop yields.
- Prefer adaptive waits and event-driven updates.
- Do not poll or replicate data more frequently or broadly than required.
- Do not force garbage collection as a substitute for correct ownership.

## Testing

Select tests from `.ai/matrices/quality-gates.json`. At minimum test the normal path, invalid input, relevant failure, cleanup, and restart behavior.

## Context economy

- Read one relevant recipe and only the matrix entries matching the feature characteristics.
- Do not load the full engineering reference unless a rule needs deeper explanation.
- Do not load unrelated providers, examples, or delivered requirements.