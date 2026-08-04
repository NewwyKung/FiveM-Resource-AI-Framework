# Asset Rules

- Keep raw/source assets separate from optimized runtime assets.
- Optimize images to target dimensions and prefer WebP where supported.
- Use SVG for simple icons and scalable vectors.
- Lazy-load noncritical NUI media; preload only critical UI assets.
- Avoid oversized textures, audio, and streamed models.
- Request assets/models before use and release them afterward.
- Maintain explicit memory/performance budgets for large asset sets.
- Use sprite sheets/atlases only when they materially reduce overhead.
- Never put dynamic text into raster UI artwork.
- Validate names, formats, dimensions, transparency, and generated output paths.
