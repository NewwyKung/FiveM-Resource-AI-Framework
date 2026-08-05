# Optional FiveM Runtime Tests

This harness is opt-in because it requires an FXServer environment and can add setup cost. Discovery must ask whether the user wants runtime tests for the resource.

Use runtime tests when the feature depends on:

- FiveM natives or entity lifecycle;
- player connect/drop behavior;
- resource start/stop cleanup;
- framework/provider exports;
- state bags or network ownership;
- NUI callbacks inside CEF;
- database/provider startup behavior.

Do not use runtime tests for pure functions that can run in a lightweight unit test.

## Decision

The runner remains a reusable standalone test resource. It never enters a production manifest. Selected suites are listed explicitly in its manifest so adding a test is reviewable and load order is deterministic.

## Minimal flow

1. Copy `test_runner/` into a separate test resource.
2. Add resource-specific files under `tests/` and list them explicitly in `fxmanifest.lua`.
3. Optionally set `runtime_tests_target` and `runtime_tests_provider` convars.
4. Start the target resource and test runner on a development server.
5. Run `runtime-tests list`, then `runtime-tests` from the server console.
6. Read `runtime_tests_last_result` when an external FXServer job needs pass/fail evidence.

## Token-efficient AI rule

AI reads this pack only when the user selects runtime tests or the acceptance criteria require native/lifecycle verification. Otherwise it writes a concise manual runtime checklist and reports that FXServer checks were not executed.

## Required scenarios

Select only relevant scenarios:

- resource start and restart;
- player drop cleanup;
- invalid/spammed network request;
- provider stopped or unavailable;
- database connection/migration failure;
- NUI callback timeout/focus recovery;
- entity deletion and ownership changes.

Player disconnect, CEF focus, entity ownership, and actual provider/database failures still need resource-specific fixtures or manual gameplay. The bundled suites cover config bootstrap, request/error contracts, duplicate registration detection, per-test timing, target start state, target runtime status, and optional provider availability.
