# Module loading

FiveM loads scripts in the order declared in `resource/fxmanifest.lua`.

## Shared runtime

1. `resource/config/config.main.lua`
2. shared runtime libraries
3. explicit root domain configs
4. nested shared domain configs
5. `resource/shared/lib/`
6. `resource/shared/modules/`

## Client runtime

1. `resource/client/lib/`
2. `resource/client/modules/`
3. `resource/client/main.lua`

## Server runtime

1. `resource/server/lib/`
2. `resource/server/modules/`
3. `resource/server/main.lua`

## Module convention

- A module file should declare one focused feature or service.
- Avoid hidden dependency on alphabetical file order.
- Shared utilities belong in `resource/shared/lib/`; gameplay/domain behavior belongs in the matching `resource/*/modules/` directory.
- `main.lua` is the runtime bootstrap and loads last. It should coordinate initialization rather than contain full feature implementations.
- Client and server modules must not share mutable globals across runtimes; exchange data through events, callbacks, exports, or state bags.
- Add an explicit manifest entry when one module genuinely must load before another instead of relying on filename ordering.
