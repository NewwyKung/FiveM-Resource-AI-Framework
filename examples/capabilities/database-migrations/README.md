# Optional Database Migrations

Use this pack only when the approved resource persists data in a database.

## Design

- forward-only SQL migrations;
- immutable migration files after release;
- migration ID and checksum tracking;
- transaction when the selected driver supports it;
- no automatic destructive rollback;
- no migration runtime or database dependency in resources that do not use a database.

## Structure

```text
resource/server/database/migration.lua
sql/migrations/001_initial.sql
sql/migrations/002_add_index.sql
```

The selected database adapter must provide:

```text
Query
Single
Insert
Transaction
```

The migration runner must never call oxmysql directly unless oxmysql is the activated provider.

## Release behavior

Copy `sql/migrations/` into the release package. Apply migrations through an explicit server startup policy or documented deployment command. Never hide destructive schema changes inside normal gameplay events.

## Required tests

- first run applies pending migrations;
- second run does not reapply them;
- checksum mismatch fails closed;
- failed migration is not marked applied;
- transaction rollback is verified when supported;
- existing production migration files are not modified.
