# CI/CD Templates

GitHub Actions are intentionally disabled in this template. Opt-in examples live under `examples/github-workflows/` so cloning the repository never enables hosted automation or consumes runner minutes without owner approval.

The CI example installs UI dependencies, runs the root validation aggregator, installs the repository-pinned LuaLS version, and runs Lua diagnostics. The release example validates first, builds a production release, and uploads only the generated resource folder as an artifact.

Before enabling either workflow:

- review action and runtime versions against your organization policy;
- keep `contents: read` unless publishing requires a narrowly scoped permission;
- configure selected provider or deployment secrets in the hosting platform, never in source files;
- protect release environments when artifacts are deployed automatically;
- keep FXServer lifecycle, player, native, provider, and NUI-focus checks as explicit runtime verification.

See `examples/github-workflows/README.md` for activation steps. Local commands remain the source of truth and can run without GitHub Actions.
