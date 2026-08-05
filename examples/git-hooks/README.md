# Optional Git Hook

The `pre-commit` file is a template. It is not installed and this repository never changes developer Git configuration automatically.

To opt in, review the script for your shell and copy it to `.git/hooks/pre-commit`. The hook regenerates `.ai/index.json`, fails when the generated index is not staged, then runs `npm run validate:fast`. Production UI builds, release integration, LuaLS, and FXServer tests remain explicit commands.
