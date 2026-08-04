---
name: release-resource
description: Prepare a resource for production deployment.
---

# Release Resource

1. Confirm manifest metadata, paths, dependencies, and load order.
2. Build NUI from `ui/`; verify `html/` output and production `ui_page`.
3. Remove dev-only localhost/debug behavior.
4. Run relevant unit, integration, security, and NUI checks.
5. Verify resource stop/restart and player-drop cleanup.
6. Check public API compatibility and version notes.
7. Check no secrets/raw assets/dev dependencies are packaged.
8. Summarize release risks and unexecuted checks.
