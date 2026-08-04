---
name: release-resource
description: Build a production-ready FiveM resource package under release/<resource-name>-<version>.
---

# Release Resource

## Inputs
Resolve from `resource.json`, approved requirements, and the user's instruction:
- resource name
- release intent: patch, minor, major, or explicit version
- whether UI build is required; default is yes
- runtime folders/files that must be packaged
- required public configuration defaults

Do not ask for a version when normal semantic-version inference is possible.

## Version numbering
Use Semantic Versioning (`MAJOR.MINOR.PATCH`):
- first release uses the current `resource.json.version`;
- later releases increment `PATCH` by default;
- use `MINOR` for backward-compatible features;
- use `MAJOR` for approved breaking changes;
- an explicit user version overrides inference.

Keep `resource.json` and `fxmanifest.lua` on the created release version.

## Default command

```bash
node scripts/create-release.mjs
```

Options:

```bash
node scripts/create-release.mjs --bump minor
node scripts/create-release.mjs --bump major
node scripts/create-release.mjs --version 2.4.0
node scripts/create-release.mjs --name my_resource
node scripts/create-release.mjs --skip-ui-build
node scripts/create-release.mjs --dry-run --skip-ui-build
```

## Workflow
1. Read `release.config.json`; update its runtime allowlist when approved runtime roots changed.
2. Confirm selected integrations and remove inactive bridges, drivers, provider configs, dependencies, tests, and manifest entries.
3. Run validation and relevant tests.
4. Build UI from `ui/` unless the user explicitly says not to build.
5. If build is skipped, require an existing valid `html/index.html`; never package missing/stale UI silently.
6. Create `release/<resource_name>-<version>`.
7. Copy only allowlisted runtime files. Never copy `.ai/`, `.github/`, `docs/`, `examples/`, `tests/`, `scripts/`, `ui/`, source maps, or development dependencies.
8. Patch the packaged manifest to production `ui_page 'html/index.html'` and the release version.
9. Sanitize configured secret-bearing keys and scan for webhook/private-key patterns.
10. Fail the release if a secret remains, a required runtime file is missing, the destination already exists, or validation fails.
11. Write `RELEASE.json` with release metadata and sanitized-field evidence.
12. Inspect the final folder as if it were copied directly into `resources/` and started with `ensure <folder>`.

## Config and secret policy
- Keep public operational config needed to run the resource.
- Remove real webhooks, tokens, API keys, passwords, client secrets, and private keys.
- Do not copy `.env`, local credentials, AI memory, raw provider docs, or private server configuration.
- Prefer `nil`/`null` sanitized values plus documented server-owner setup over fake credentials.
- Never claim a secret-clean release if the scan was not run.

## Completion evidence
Report:
- output path
- chosen version and bump rationale
- whether UI was built or intentionally reused
- included runtime roots
- sanitized fields and secret-scan result
- validation/tests executed
- files or checks omitted and remaining deployment risks
