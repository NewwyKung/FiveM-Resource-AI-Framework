# <Provider Name>

- Capability: `<framework|database|inventory|notify|logger|progress|target|other>`
- Resource: `<resource-name>`
- Selected in: `integrations.json`
- Runtime adapters:
  - Client: `<path|none>`
  - Server: `<path|none>`
- Verification: `<verified|unverified|partial>`

## Operation

`<Capability>.<Operation>(options)`

Use one compact object per operation, conforming to `docs/schemas/provider-operation.schema.json`:

```json
{
  "name": "Capability.Operation",
  "runtime": "server",
  "arguments": [
    { "name": "options", "required": true, "contract": "OperationOptions" }
  ],
  "sideEffects": ["none"],
  "returns": "OperationResult",
  "errors": ["PROVIDER_UNAVAILABLE"],
  "dependencies": ["provider_resource"],
  "unsupportedWith": []
}
```

## Option matrix

| Option | Type | Required | Default | Runtime | Conditions / dependencies |
|---|---|---:|---|---|---|
| `<name>` | `<type>` | yes/no/conditional | `<value>` | shared/client/server | `<rules>` |

## Return contract

- Success: `<shape>`
- Failure: `<error codes>`

## Provider mapping

Document only the source export/event/callback and the transformation performed by the adapter. Feature code must not call the provider directly.

Never place API keys, tokens, passwords, webhook URLs, or private credentials in a provider profile.

## Limitations

- `<unsupported behavior>`

## Failure behavior

- Missing resource: `<behavior>`
- Invalid option: `<behavior>`
- Missing conditional dependency: `<behavior>`

## Examples

Keep examples minimal and separate by runtime.
