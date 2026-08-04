# Known Problems

Record only reproduced or confirmed recurring issues.

| Problem | Scope | Current handling | Source |
|---|---|---|---|
| Development NUI requires the Vite server | Local development | Use port `5171`; production must use `html/index.html` | `fxmanifest.lua`, `ui/vite.config.js` |
| Generated NUI output can become stale | Release | Rebuild `ui/` before release and do not edit `html/` directly | `.ai/rules/testing.md` |

Add entries with evidence, not guesses. Remove entries after the underlying problem is permanently resolved.
