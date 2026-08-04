# nc_discordlogs Contract Test Cases

These cases must be exercised in a running FiveM test server before changing the provider status to `verified: true`.

| Runtime | Case | Expected result |
|---|---|---|
| Client | valid webhook/title | provider export called; returns `true` |
| Client | missing webhook | `false, LOGGER_WEBHOOK_REQUIRED` |
| Client | `xPlayer` supplied | `false, LOGGER_SERVER_ONLY_OPTION` |
| Client | `xTarget` supplied | `false, LOGGER_SERVER_ONLY_OPTION` |
| Client | screenshot enabled and `screenshot-basic` stopped | `false, LOGGER_SCREENSHOT_DEPENDENCY_MISSING` |
| Client | selected logger resource stopped | `false, LOGGER_RESOURCE_NOT_STARTED` |
| Server | valid webhook and `xPlayer` | provider export called; returns `true` |
| Server | missing `xPlayer` | `false, LOGGER_XPLAYER_REQUIRED` |
| Server | `screenshot` supplied | `false, LOGGER_CLIENT_ONLY_OPTION` |
| Server | optional `xTarget` supplied | provider export receives `xTarget` |
| Server | selected logger resource stopped | `false, LOGGER_RESOURCE_NOT_STARTED` |
| Both | options is not a table | `false, INVALID_OPTIONS` |

## Payload inspection

Verify that adapters forward only documented fields and do not pass arbitrary feature data into the provider export.

## Provider behavior not asserted by the adapter

The supplied provider notes state that `title` takes precedence when `title` and `message` are both supplied. Confirm this behavior against the actual resource before documenting it as verified provider behavior.
