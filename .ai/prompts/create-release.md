# Create Production Release

Use `.ai/skills/release-resource/SKILL.md` and `.ai/checklists/before-release.md`.

Create a production-ready release under:

```text
release/<resource_name>-<version>
```

Default behavior:
- infer Semantic Version automatically;
- build UI;
- copy only runtime allowlisted files;
- remove inactive bridges/providers and repository-only files;
- patch the packaged manifest for production;
- sanitize webhooks and secrets;
- run the secret scan and validation;
- report the final output path and evidence.

Only skip the UI build when the user explicitly requests it. In that case, verify the existing `resource/html/` build before packaging.
