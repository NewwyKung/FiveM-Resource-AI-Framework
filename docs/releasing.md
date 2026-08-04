# Production Releases

A release is a clean FiveM resource folder created under:

```text
release/<resource_name>-<version>/
```

The generated folder is intended to be copied directly into the server's `resources/` directory and started with:

```cfg
ensure <resource_name>-<version>
```

## Create a release

```bash
node scripts/create-release.mjs
```

The UI is built by default. Skip the build only when an existing production build under `html/` is intentionally reused:

```bash
node scripts/create-release.mjs --skip-ui-build
```

Preview name/version without creating files:

```bash
node scripts/create-release.mjs --dry-run --skip-ui-build
```

## Versioning

The builder uses Semantic Versioning:

- first release: current version from `resource.json`
- later release: patch increment by default
- backward-compatible feature: `--bump minor`
- breaking release: `--bump major`
- explicit override: `--version 2.3.0`

The output folder, packaged `fxmanifest.lua`, source `fxmanifest.lua`, and `resource.json` use the same version.

## Packaging allowlist

`release.config.json` controls runtime paths allowed into a release. The default package may include `fxmanifest.lua`, runtime Lua/config folders, built `html/`, optional runtime assets/data/sql, and `LICENSE`.

It intentionally excludes AI instructions, docs, examples, tests, scripts, UI source, GitHub configuration, development dependencies, source maps, and placeholders. Add new runtime roots deliberately; never copy the repository wholesale.

## UI behavior

Default behavior:
1. run `npm run build --prefix ui`;
2. require `html/index.html`;
3. copy `html/`;
4. patch the packaged manifest to `ui_page 'html/index.html'`;
5. remove localhost development entries.

`--skip-ui-build` reuses existing `html/`; it does not disable UI.

## Explicit config sanitization

The builder does not erase values merely because a key contains words such as `token`, `password`, or `secret`. Broad key-name cleanup can destroy legitimate gameplay configuration.

Declare exact sanitizers in `release.config.json`:

### JSON path

```json
{
  "jsonSecretPaths": [
    {
      "file": "config/server.json",
      "path": "discord.webhook",
      "replacement": null
    }
  ]
}
```

### Text/Lua pattern

```json
{
  "textSanitizers": [
    {
      "file": "config/server.lua",
      "pattern": "Config\\.Webhook\\s*=\\s*['\"][^'\"]+['\"]",
      "replacement": "Config.Webhook = nil",
      "flags": "gm"
    }
  ]
}
```

Configured paths and patterns must exist and match. Otherwise release creation fails, preventing stale cleanup rules from silently doing nothing.

After explicit sanitization, the builder scans for known webhook/private-key values and credential-like assignments. A suspicious value without an approved sanitizer causes a failure and must be reviewed manually.

Never store secrets in AI memory, provider profiles, public examples, or source-controlled release configuration.

## Output metadata

Each release contains `RELEASE.json` with resource name, version, generation time, UI-build status, and exact fields/patterns sanitized.

## Automated integration test

CI builds a real temporary release using:

```bash
node tests/release/create-release.integration.mjs
```

It verifies allowlisted output, production manifest patching, explicit secret sanitization, metadata evidence, and exclusion of development/AI folders.

## Final deployment check

Verify:
- manifest references only included files;
- no localhost URL remains;
- built UI exists when enabled;
- required integrations/dependencies are declared;
- inactive bridges are absent;
- explicit sanitizers and secret scan passed;
- start/restart/player-drop cleanup was tested;
- the folder runs without repository-only files.
