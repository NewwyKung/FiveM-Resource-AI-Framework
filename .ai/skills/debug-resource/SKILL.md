---
name: debug-resource
description: Diagnose and fix a FiveM resource defect with minimal regression risk.
---

# Debug Resource

## Workflow
1. Capture the exact symptom, runtime, trigger, and expected behavior.
2. Reproduce or trace the smallest failing path.
3. Classify the fault: client, server, shared, config, NUI, database, entity, network, or lifecycle.
4. Inspect relevant logs/contracts and identify root cause.
5. Apply the smallest fix at the correct authority boundary.
6. Add a regression test or reproducible validation.
7. Check cleanup/restart/player-drop behavior when relevant.

Do not mask errors with broad `pcall`, silent returns, or arbitrary delays.
