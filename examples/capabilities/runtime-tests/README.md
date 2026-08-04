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

## Minimal flow

1. Copy `test_runner/` into a separate test resource.
2. Register resource-specific test modules explicitly.
3. Start the target resource and test runner on a development server.
4. Run `runtime-tests` from the server console.
5. Return non-zero/failing evidence in CI when an FXServer job is configured.

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
