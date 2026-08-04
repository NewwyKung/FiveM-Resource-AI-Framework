---
name: review-security
description: Review trust boundaries, abuse paths, and operational fault handling.
---

# Review Security

## Read
- `.ai/rules/security.md`
- `.ai/rules/fault-handling.md`
- public API/event contracts

## Review
- client-controlled values and authority
- source/permission/ownership/range/distance validation
- event spam, replay, race, and duplicate transaction handling
- database parameterization and atomicity
- secret exposure
- entity/network ID validation
- cleanup on drop/restart
- NUI focus/bridge failure
- bounded caches, retries, and pending callbacks

## Output
Prioritized findings with severity, affected path, exploit/failure scenario, and smallest safe remediation.
