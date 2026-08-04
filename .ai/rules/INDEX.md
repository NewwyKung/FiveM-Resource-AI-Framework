# Rule Index

Load only rules relevant to the current task.

| Domain | Rule |
|---|---|
| FiveM boundaries, manifests, lifecycle | `fivem.md` |
| Lua style, performance, modules | `lua.md` |
| Events, trust boundaries, exploits | `security.md` |
| Svelte NUI and browser/FiveM bridge | `ui.md` |
| Visual direction, hierarchy, interaction craft | `design.md` |
| Faults, cleanup, degraded operation | `fault-handling.md` |
| Exports, events, callbacks, versions | `api.md` |
| Tests and release validation | `testing.md` |
| Images, audio, models, streaming | `assets.md` |
| Lua and NUI translations | `localization.md` |

Do not load all rule files by default.

For UI work:
- Visual design or review: load `design.md`.
- Svelte/NUI implementation: load `ui.md`.
- Tasks spanning both may load both files.