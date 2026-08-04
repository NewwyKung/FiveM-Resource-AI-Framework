# Configuration structure

`resource/config/config.main.lua` is the shared configuration entrypoint and must load first.

## Layout

```text
config/
|-- config.main.lua
|-- config.item.lua
`-- <domain>/
    `-- <config-file>.lua
```

## Conventions

- Keep global shared settings in `config.main.lua`.
- A small shared domain may use a root file such as `config.item.lua`.
- Root domain files are listed explicitly in `fxmanifest.lua` to keep load order deterministic.
- A large domain should use a folder such as `config/shop/24.7_store.lua`; nested shared domain folders are loaded by manifest glob.
- Put executable helpers in `resource/shared/lib/`, `resource/client/lib/`, or `resource/server/lib/` according to runtime.
- Do not create `config/shared/`, `config/client/`, `config/server/`, or `config/functions/`.
- Never place server secrets in shared or client configuration.
