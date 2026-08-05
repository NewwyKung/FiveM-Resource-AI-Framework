# Current Task

Use string enum values from `docs/schemas/ai-task.schema.json`. IDs route context; they do not replace task-specific acceptance criteria.

```yaml
schema: ai-task/v1
intent: feature.change
phase: implementation
characteristics: []
references:
  requirement: null
  feature: null
  skill: null
  rules: []
  decisions: []
  providers: []
  specifications: []
  example: null
scope:
  include: []
  exclude:
    - resource/html/
    - release/
acceptanceCriteria:
  - Replace with approved, testable behavior.
validation: []
```

## Context added during work
| File | Reason |
|---|---|

## Validation required
-

## Completion cleanup
- move durable decisions to requirements/registries
- remove unused adapters/config/dependencies
- reset or remove `.ai/work/current-task.md`
