# Lua Type Safety Practice

This repository uses Lua Language Server annotations and runtime boundary validation together. Lua remains dynamically typed; the goal is early diagnostics and stable contracts without filling every local function with noise.

## Required practice

Annotate:

- public exports, events, callbacks, repositories, services, adapters, and configuration shapes;
- network and NUI payloads;
- nullable values returned by frameworks, databases, entities, or external resources;
- stable domain records shared across modules.

Do not annotate trivial private locals when the type is obvious and the annotation would add no contract value.

## Contract example

```lua
---@class PurchaseRequest
---@field shopId string
---@field itemName string
---@field quantity integer

---@class PurchaseResult
---@field ok boolean
---@field error string?

---@param source integer
---@param request PurchaseRequest
---@return PurchaseResult
local function purchase(source, request)
end
```

## Boundary rule

Static annotations do not replace runtime validation. Validate every untrusted boundary:

- client-to-server events;
- NUI callbacks and messages;
- exports called by other resources;
- decoded JSON;
- framework/provider objects;
- database rows when nullable or versioned.

## Nil handling

Prefer explicit guards and stable error codes:

```lua
local player = Framework.GetPlayer(source)
if not player then
    return false, 'PLAYER_NOT_FOUND'
end
```

Do not suppress `need-check-nil` globally. Narrow or validate the value.

## Definitions

`.luarc.json` loads `types/`. Add project-specific globals and types there rather than disabling diagnostics broadly.

Provider-specific definitions belong with the activated provider profile or adapter. Do not load ESX/QBCore/Qbox/oxmysql definitions when the resource does not use them.

## AI context rule

For normal work, read this guide only when defining or changing a public contract. Otherwise use `.ai/rules/lua.md` and the affected annotated source files.

## Validation

Recommended local setup:

- Lua Language Server extension;
- workspace diagnostics enabled;
- warnings for nil checks and parameter/return mismatches;
- inspect only changed files before completion.

CI type diagnostics may be added when a stable LuaLS CLI environment is selected. Do not claim CI type-checking until that command is present in the workflow.
