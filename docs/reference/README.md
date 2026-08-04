# Reference Library

This directory stores long-form background material. It is not part of the default AI context.

## Loading policy

1. Read repository source, approved requirements, selected provider profiles, canonical rules, and the active recipe first.
2. Read `fivem-engineering-reference.md` only when deeper reasoning is needed.
3. Never load the entire reference during routine implementation.
4. Current source and official version-specific documentation override historical examples.

## Supplied guide mapping

The normalized English reference consolidates these supplied Thai guides:

| Supplied guide | Canonical destination |
|---|---|
| UI/NUI with Svelte | `.ai/rules/ui.md`, `implement-ui`, NUI recipe |
| Testing and QA | `.ai/rules/testing.md`, quality matrix |
| Fault case handling | `.ai/rules/fault-handling.md`, quality matrix |
| Lua techniques | `.ai/rules/lua.md`, selective patterns |
| Developer skills | capability coverage, not an agent skill |
| Architecture | architecture rules and recipes |
| Asset pipeline | `.ai/rules/assets.md` |
| Lua best practices | FiveM/Lua/security rules |
| Localization | `.ai/rules/localization.md` |
| API reference | `.ai/rules/api.md` and registries |

The original documents contained useful examples but also assumptions tied to older Svelte/Vite versions, ESX, oxmysql, ox_lib, Tailwind, and specific architecture choices. Those assumptions were not promoted to canonical defaults.