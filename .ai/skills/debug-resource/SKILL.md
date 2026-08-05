---
name: debug-resource
description: Diagnose and fix a FiveM resource defect with minimal regression risk.
---

# Debug Resource

## Workflow
1. Capture reproduction steps, expected/actual behavior, runtime side, artifact version, enabled providers, and last known good commit.
2. Request only the relevant FXServer, client, or NUI log slice; redact credentials and unrelated player data.
3. Produce the smallest reproduction before editing. If runtime reproduction is unavailable, state that limitation.
4. Classify the fault: client, server, shared, config, NUI, database, entity, network, provider, or lifecycle.
5. Trace from the observed error to the smallest relevant bootstrap, contract, handler, service, adapter, or UI bridge path. Do not load the whole repository.
6. Separate confirmed evidence from hypotheses and list the next observation that would prove each remaining hypothesis.
7. Apply the smallest fix at the correct authority boundary and add a regression test or reproducible validation.
8. Check cleanup/restart/player-drop behavior when relevant.

## Fault matrix

| Symptom | First evidence | Required edge case |
|---|---|---|
| Missing export | selected provider profile, resource state, start order | provider stopped/restarted |
| Invalid entity/network ID | source, ownership, existence, scope | owner change or deletion |
| Player disconnect | player-scoped state and in-flight operation | drop during mutation |
| Callback timeout | request ID, pending bound, response path | late/stale response |
| NUI focus lock | close callback, Escape, resource stop | UI crash/restart |
| Duplicate handler | registration owner and bootstrap count | resource restart |
| Database failure | adapter operation and transaction result | unavailable provider/rollback |

Record a recurring issue in `.ai/memory/known-problems.md` only after reproduction or other direct confirmation. Label unverified explanations as hypotheses and do not preserve them as memory.

Do not mask errors with broad `pcall`, silent returns, or arbitrary delays.
