# Test Execution

## Local checks

From repository root run:

```powershell
npm.cmd run validate
```

Individual Node integration tests remain available under `tests/` and do not require FXServer.

## FXServer runtime tests

1. Copy `examples/capabilities/runtime-tests/test_runner/` into the server resources directory as `framework_runtime_tests`.
2. Add the target resource and runner to `server.cfg`:

```cfg
set runtime_tests_target "my_resource"
ensure my_resource
ensure framework_runtime_tests
```

3. Start FXServer and run these commands in the server console:

```text
runtime-tests list
runtime-tests
```

4. Restart `my_resource`, rerun the suite, and verify the server runtime export remains active.
5. Join with a player and manually verify player-drop cleanup, NUI focus release, entity cleanup, and provider/database failure behavior relevant to the resource.

The bundled runner is opt-in, must not be added to production manifests, and does not turn manual gameplay scenarios into claimed automated coverage.
