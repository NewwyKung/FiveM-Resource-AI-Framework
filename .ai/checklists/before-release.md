# Before Release

- Release output is `release/<resource_name>-<semantic-version>`.
- Version was inferred correctly or explicitly approved; `resource.json` and both source/packaged manifests agree.
- `release.config.json` includes every required runtime root and excludes repository-only files.
- `fxmanifest.lua` references existing packaged files in deterministic order.
- Production `ui_page` points to `html/index.html` when NUI is enabled.
- UI was built by default, or build reuse was explicitly requested and `html/index.html` was verified.
- No localhost URL, debug endpoint, source map, UI source, test, example, AI instruction, or development dependency is packaged.
- Inactive framework/database/integration bridges, providers, configs, dependencies, and tests are absent.
- Public configuration required to run remains usable.
- Webhooks, tokens, API keys, passwords, client secrets, private keys, and private server settings were sanitized.
- Secret scan passed; `RELEASE.json` records sanitization evidence.
- Dependencies and minimum versions are documented.
- Resource start, restart, stop, and player-drop cleanup were tested.
- Public API compatibility and migrations were reviewed.
- Security, performance, and regression checks passed or exceptions are documented.
- The final folder can be copied directly to `resources/` and started without repository-only files.
