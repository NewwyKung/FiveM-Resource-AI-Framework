# Testing Rules

Apply the smallest useful layer:
- unit tests for pure functions and validators
- integration tests for event/data flows
- security tests for invalid, oversized, unauthorized, and replayed input
- performance tests for hot loops, serialization, and repeated queries
- NUI tests for browser state, bridge messages, visibility, and build output
- regression tests for fixed bugs

Test behavior deterministically:
- use callbacks, promises, barriers, fakes, or observable state instead of arbitrary `Wait(100)` timing
- coordinate concurrent mutation tests so requests reach the contested boundary together
- make failed automated checks return nonzero or another machine-readable failure signal
- do not simulate a resource restart by manually firing lifecycle events; use a real FXServer restart test or test the cleanup unit directly
- bound fuzz inputs and assert exact rejection/error contracts rather than checking only that code did not crash

Before release:
- verify manifest paths and dependencies
- build NUI from `resource/ui/`
- confirm production `ui_page`
- check cleanup on resource stop/player drop
- check no secrets are shipped client-side
- report tests not executed and why
