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

The UI is built by default. Skip the build only when an existing production build under `html/` is intentionally being reused:

```bash
node scripts/create-release.mjs --skip-ui-build
```

Preview the chosen name/version without creating files:

```bash
node scripts/create-release.mjs --dry-run --skip-ui-build
```

## Versioning

The release builder uses Semantic Versioning:

- first release: current version from `resource.json`
- subsequent release: patch increment by default
- backward-compatible feature release: `--bump minor`
- breaking release: `--bump major`
- explicit override: `--version 2.3.0`

The output folder, packaged `fxmanifest.lua`, source `fxmanifest.lua`, and `resource.json` are kept on the same version.

## Packaging allowlist

`release.config.json` controls which runtime paths may enter a release. The default package may include:

- `fxmanifest.lua`
- `client/`
- `server/`
- `shared/`
- `config/`
- `html/`
- optional `locales/`, `stream/`, `data/`, and `sql/`
- `LICENSE`

It intentionally excludes AI instructions, docs, examples, tests, scripts, UI source, GitHub configuration, development dependencies, source maps, and placeholder files.

When a feature adds a new runtime root, update the allowlist deliberately. Do not copy the repository wholesale.

## UI behavior

Default release behavior:

1. run `npm run build --prefix ui`;
2. require `html/index.html`;
3. copy `html/` into the release;
4. patch the packaged manifest to `ui_page 'html/index.html'`;
5. remove localhost development `ui_page` entries.

`--skip-ui-build` does not disable UI. It reuses the existing `html/` output and still requires it to exist.

## Config and secrets

The release builder sanitizes configured secret-bearing keys and scans copied files for known webhook/private-key patterns.

Default sensitive key names include:

- webhook
- token
- API key/secret
- client secret
- password
- secret

Real credentials must never be packaged. Public configuration needed by server owners should remain, while sensitive values become `nil`/`null` and must be configured after deployment.

The release fails when a known secret pattern remains. Extend `release.config.json` when the project introduces another credential format.

## Output metadata

Each release contains `RELEASE.json` with:

- resource name
- version
- generation time
- whether UI build was skipped
- fields sanitized during packaging

## Final deployment check

Before distributing or deploying the folder, verify:

- `fxmanifest.lua` references only included files;
- no localhost URL remains;
- `html/index.html` exists when UI is enabled;
- required integrations and dependencies are declared;
- inactive bridges/providers are absent;
- no real webhook, token, password, or private key is present;
- resource start/restart and player-drop cleanup were tested;
- the folder starts from the server without relying on repository-only files.
