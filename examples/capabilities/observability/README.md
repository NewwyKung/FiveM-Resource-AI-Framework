# Optional Observability Capability

Use this capability only when approved requirements select logging, telemetry, or development profiling. It defines a stable contract and does not activate a logger provider.

Copy `shared/observability.lua`, then inject an `emit(record)` operation from the selected adapter. Records contain an allowlisted level, bounded event name, timestamp, and structured fields. Never put credentials, raw authorization headers, or unnecessary player identifiers in fields. Keep provider-side buffers and delivery retries bounded.

Development timing is disabled by default. Enable it explicitly with `Observability.Create(..., { developmentTiming = true })`; keep it off in production unless profiling is an approved operational requirement.
