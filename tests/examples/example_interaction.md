# Example Interaction Test Matrix

## Unit-level behavior

- payload must be a table;
- cooldown blocks repeated requests inside `Config.CooldownMs`;
- request after cooldown succeeds;
- result objects contain `ok` and either `message` or `error`.

## Integration behavior in FiveM

1. Start `example_interaction`.
2. Run `/example-interaction`.
3. Confirm success output.
4. Run it again immediately and confirm `RATE_LIMITED`.
5. Wait for the cooldown and confirm success.
6. Reconnect and confirm stale cooldown state is not retained.
7. Restart the resource and confirm state is reset.

## Security cases

- non-table payload returns `INVALID_PAYLOAD`;
- client-supplied timestamp does not control the cooldown decision;
- client cannot select success, message, or server state.

This file is an executable test plan for a running FiveM server. Pure logic should be extracted into modules and tested with the project's chosen Lua test runner when one is selected.
