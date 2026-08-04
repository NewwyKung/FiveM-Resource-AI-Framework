# nc_discordlogs

- Capability: `logger`
- Resource: `nc_discordlogs`
- Source call: `exports.nc_discordlogs:Discord(options)`
- Selected in: `integrations.json`
- Client adapter: `client/modules/integrations/logger.nc_discordlogs.lua`
- Server adapter: `server/modules/integrations/logger.nc_discordlogs.lua`
- Verification: `unverified` — contract is based on the supplied provider usage and must be tested in a running server.

## Public template contract

Feature code calls:

```lua
local ok, errorCode = Integrations.Logger.Send(options)
```

Feature code must not call `exports.nc_discordlogs:Discord` directly.

## Option matrix

| Option | Type | Required | Default | Runtime | Conditions / notes |
|---|---|---:|---|---|---|
| `webhook` | string | yes | — | client/server | Name configured in the provider's `Config.Webhooks`. |
| `xPlayer` | provider player object | server only: yes | — | server | Required on every server call. Forbidden on client. |
| `xTarget` | provider player object | no | nil | server | Target player object for the affected player. Forbidden on client. |
| `title` | string | no | nil | client/server | Explicit Discord embed title. |
| `message` | string | no | nil | client/server | Used to produce a player-name-prefixed title when `title` is absent; when both are supplied, provider behavior favors `title` according to the supplied usage notes. |
| `description` | string | no | nil | client/server | Embed description. |
| `fields` | array | no | nil | client/server | Each field contains `name`, `value`, and optional `inline`. |
| `fields[].name` | string | conditional | — | client/server | Required when a field entry exists. |
| `fields[].value` | string | conditional | — | client/server | Required when a field entry exists. |
| `fields[].inline` | boolean | no | provider default | client/server | Controls whether fields share a row. |
| `imageURL` | string | no | nil | client/server | Image URL. |
| `color` | hex string | no | `ffffff` | client/server | Six-character hex color without a required leading `#`. |
| `public` | boolean/nil | no | nil | client/server | Provider-specific public log behavior. |
| `screenshot` | boolean | no | false/nil | client | Client only. Requires resource `screenshot-basic` to be started. Forbidden on server. |

## Adapter validation

### Client

- Rejects `xPlayer` and `xTarget` with `LOGGER_SERVER_ONLY_OPTION`.
- Requires non-empty `webhook`.
- When `screenshot == true`, requires `screenshot-basic` to be started.
- Requires the selected logger resource to be started.

### Server

- Requires `xPlayer`; otherwise returns `LOGGER_XPLAYER_REQUIRED`.
- Rejects `screenshot` with `LOGGER_CLIENT_ONLY_OPTION`.
- Allows optional `xTarget`.
- Requires non-empty `webhook` and the logger resource to be started.

## Return contract

- Success: `true`
- Failure: `false, errorCode`

Known error codes:
- `INVALID_OPTIONS`
- `LOGGER_WEBHOOK_REQUIRED`
- `LOGGER_XPLAYER_REQUIRED`
- `LOGGER_SERVER_ONLY_OPTION`
- `LOGGER_CLIENT_ONLY_OPTION`
- `LOGGER_SCREENSHOT_DEPENDENCY_MISSING`
- `LOGGER_RESOURCE_NOT_STARTED`
- `LOGGER_PROVIDER_NOT_CONFIGURED`

## Client example

```lua
Integrations.Logger.Send({
    webhook = 'webhook',
    title = 'Player action',
    description = 'Client-side action completed.',
    screenshot = true,
})
```

## Server example

```lua
Integrations.Logger.Send({
    webhook = 'webhook',
    xPlayer = xPlayer,
    xTarget = xTarget,
    title = 'Administrative action',
    description = 'Action completed.',
    fields = {
        {
            name = 'Reason',
            value = 'Example reason',
            inline = true,
        },
    },
    color = 'ff0000',
})
```
