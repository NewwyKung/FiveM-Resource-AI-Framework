---
name: setup-dev-resource
description: Connect the repository's canonical resource directory to an FXServer development resources folder using the guarded cross-platform link script. Use when setting up or repairing a local FiveM development resource link.
---

# Setup Development Resource

Use this workflow when the user wants to run this repository in an FXServer development environment.

## Principle

`resource/` is the development resource source of truth. Do not copy its runtime folders into another development directory. Create one directory link from the FXServer resources directory to `<repo>/resource`.

## Required inputs

Ask only for information that is not already known:

1. The FXServer `resources` folder or category folder, for example `D:\FXServer\server-data\resources\[local]` or `/srv/fivem/server-data/resources/[local]`.
2. The resource name that should appear inside that folder. Default to the repository directory name.

Do not ask again when the path and name are already available in the current task or confirmed environment memory.

## Preferred cross-platform command

Run from the repository root:

```bash
npm run setup:dev -- --resources "/path/to/resources/[local]" --name my_resource
```

The command works on Windows, Linux, and macOS. It creates a Windows junction or Unix directory symbolic link as appropriate.

Use `--force` only to replace an existing symbolic link or junction:

```bash
npm run setup:dev -- --resources "/path/to/resources/[local]" --name my_resource --force
```

The script must refuse to remove a real directory or regular file.

## Windows PowerShell fallback

The guarded PowerShell helper remains available when Node.js setup is not suitable:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-dev-resource.ps1
```

Non-interactive form:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-dev-resource.ps1 `
  -ResourcesPath 'D:\FXServer\server-data\resources\[local]' `
  -ResourceName 'my_resource'
```

Use `-Force` only to replace an existing junction or reparse point. The helper must refuse to delete a real directory.

## Result

The link targets `<repo>/resource` and exposes:

- `client/`
- `server/`
- `shared/`
- `config/`
- `ui/`
- `html/`
- `fxmanifest.lua`

Finish by telling the user to add or verify `ensure <resource-name>` in `server.cfg`.
