# Asset Rules

- Keep raw/source assets separate from optimized runtime assets.
- Optimize images to target dimensions and prefer WebP where supported.
- Use SVG for simple icons and scalable vectors.
- Lazy-load noncritical NUI media; preload only critical UI assets.
- Avoid oversized textures, audio, and streamed models.
- Request assets/models before use and release them afterward.
- Track asset ownership; use reference counts when multiple consumers can acquire the same runtime asset.
- Give asynchronous loads a deadline and cancellation/cleanup path for resource stop and owner disposal.
- Maintain explicit memory/performance budgets for large asset sets.
- Bound asset caches, queues, and metrics by count and lifetime.
- Use sprite sheets/atlases only when they materially reduce overhead.
- Never put dynamic text into raster UI artwork.
- Validate names, formats, dimensions, transparency, and generated output paths.
- Do not force garbage collection to compensate for leaked assets or unbounded caches.
