# UI External Handoff

Use only when an approved UI phase is intentionally sent to v0, Claude frontend-design, or another external design environment.

Send this compact payload:

```yaml
phase: wireframe | design | implementation | review
objective: <one sentence>
specification: docs/ui-spec/<screen>.md
designSystem: docs/design/design-system.md
affectedFiles: []
requiredStates: []
viewports: []
constraints:
  - FiveM Chromium NUI
  - Svelte and repository-native CSS only
  - no Tailwind, React/Next conversion, or new dependency without approval
  - preserve NuiBridge, focus, Escape, cleanup, and responsive sizing contracts
validation: []
```

Do not send unrelated source, chat history, provider profiles, secrets, generated `resource/html/`, or all UI skills.

Require the external environment to return:

- changed files or a reviewable patch;
- screenshots and viewport for each state actually rendered;
- interactions actually clicked or exercised;
- commands/checks executed and their result;
- deviations from the approved specification;
- explicit unavailable evidence rather than inferred success.

For v0, request wireframe/layout artifacts only. For Claude frontend-design, request Svelte-compatible source and live interaction evidence only when its preview/browser capability is available.
