# Testing Rules

Apply the smallest useful layer:
- unit tests for pure functions and validators
- integration tests for event/data flows
- security tests for invalid, oversized, unauthorized, and replayed input
- performance tests for hot loops, serialization, and repeated queries
- NUI tests for browser state, bridge messages, visibility, and build output
- regression tests for fixed bugs

Before release:
- verify manifest paths and dependencies
- build NUI from `resource/ui/`
- confirm production `ui_page`
- check cleanup on resource stop/player drop
- check no secrets are shipped client-side
- report tests not executed and why
