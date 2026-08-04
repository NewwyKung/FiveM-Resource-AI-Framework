# Module loading

FiveM loads scripts in the order declared in `fxmanifest.lua`.

## Shared runtime

1. `config/config.main.lua`
2. shared config helper functions
3. explicit root domain configs
4. nested shared domain configs
5. `shared/lib/`
6. `shared/modules/`

## Client runtime

1. client config helper functions
2. `config/client/`
3. `client/modules/`
4. `client/main.lua`

## Server runtime

1. server config helper functions
2. `config/server/`
3. `server/modules/`
4. `server/main.lua`

## Module convention

- A module file should declare one focused feature or service.
- Avoid hidden dependency on alphabetical file order.
- Shared utilities belong in `shared/lib/`; gameplay/domain behavior belongs in `*/modules/`.
- `main.lua` is the runtime bootstrap and loads last. It should coordinate initialization rather than contain full feature implementations.
- Client and server modules must not share mutable globals across runtimes; exchange data through events, callbacks, exports, or state bags.
- Add an explicit manifest entry when one module genuinely must load before another instead of relying on filename ordering.
