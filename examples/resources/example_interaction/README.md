# Example Interaction Resource

A self-contained FiveM resource demonstrating:

- deterministic manifest loading;
- shared configuration;
- namespaced client/server events;
- server-side payload validation;
- basic rate limiting;
- player-drop and resource-stop cleanup;
- stable success/error result objects.

## Run

Copy `example_interaction` into the server resources directory, add:

```cfg
ensure example_interaction
```

Then run in the client console:

```text
/example-interaction
```

This example intentionally has no framework, database, UI, or external integration. Add those only after discovery selects them.
