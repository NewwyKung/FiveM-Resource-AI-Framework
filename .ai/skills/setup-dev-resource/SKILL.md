# Setup Development Resource

Use this workflow when the user wants to run this repository in an FXServer development environment.

## Principle

The repository root is the resource source of truth. Do not copy `client/`, `server/`, `shared/`, `config/`, `ui/`, or `html/` into another development folder. Create one directory junction from the FXServer resources directory to the repository root.

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

The junction target contains the whole resource structure directly:

- `client/`
- `server/`
- `shared/`
- `config/`
- `ui/`
- `html/`
- `fxmanifest.lua`

Finish by telling the user to add or verify `ensure <resource-name>` in `server.cfg`.
