# Requirements Memory

Store requirements by lifecycle so agents do not scan unrelated history.

- `active/`: Discovery, Proposed, Approved, or Implementing.
- `delivered/`: completed requirements retained for maintenance and regression context.
- `superseded/`: replaced decisions retained only for history or migration analysis.
- `TEMPLATE.md`: create new active requirements from this template.

## Routing

Read `active/<feature>.md` first. Read `delivered/` only for maintenance, regression, compatibility, or prior acceptance criteria. Read `superseded/` only when resolving historical decisions or migrations.

Move files when status changes; do not duplicate the same requirement in multiple lifecycle folders.
