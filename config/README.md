# Configuration structure

`config/config.main.lua` is the shared configuration entrypoint and must load first.

## Layout

```text
config/
├─ config.main.lua
├─ config.item.lua
├─ functions/
│  ├─ config.functions.shared.lua
│  ├─ config.functions.client.lua
│  └─ config.functions.server.lua
├─ shared/
├─ client/
├─ server/
└─ <domain>/
   └─ <config-file>.lua
```

## Conventions

- Keep global shared settings in `config.main.lua`.
- A small shared domain may use a root file such as `config.item.lua`.
- Root domain files are listed explicitly in `fxmanifest.lua` to keep load order deterministic.
- A large domain should use a folder such as `config/shop/24.7_store.lua`; nested shared domain folders are loaded by manifest glob.
- Put client-only values in `config/client/`.
- Put server-only values and secrets in `config/server/`.
- Put reusable configuration helpers in `config/functions/` according to their runtime.
- Never place server secrets in shared or client configuration.
