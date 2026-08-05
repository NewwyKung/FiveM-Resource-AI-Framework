---
name: setup-dev-resource
description: Connect the repository's canonical resource directory to an FXServer development resources folder using the guarded junction script. Use when setting up or repairing a local FiveM development resource link.
---

# Setup Development Resource

Use this workflow when the user wants to run this repository in an FXServer development environment.

## Principle

`resource/` is the development resource source of truth. Do not copy its runtime folders into another development directory. Create one directory junction from the FXServer resources directory to `<repo>/resource`.

## Required questions

Before creating a junction, ask only for information that is not already known:

1. Where is the FXServer `resources` folder or category folder, for example `D:\FXServer\server-data\resources\[local]`?
2. What resource name should appear inside that folder? Default to the repository directory name.

Do not ask again when the path and name are already available in the current task or confirmed environment memory.

## Command

Run from the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-dev-resource.ps1
```

Non-interactive form:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-dev-resource.ps1 `
  -ResourcesPath 'D:\FXServer\server-data\resources\[local]' `
  -ResourceName 'my_resource'
```

Use `-Force` only to replace an existing junction. The script must refuse to delete a real directory.

## Result

The junction targets `<repo>/resource` and exposes this structure directly:

- `client/`
- `server/`
- `shared/`
- `config/`
- `ui/`
- `html/`
- `fxmanifest.lua`

The script verifies `resource/fxmanifest.lua` before changing the destination and refuses to replace a real directory.

Finish by telling the user to add or verify `ensure <resource-name>` in `server.cfg`.
