<script>
    let { name = '', size = 20, color = 'currentColor', strokeWidth = 1.8 } = $props();

    // Hand-drawn line icons (24x24 viewBox) — no icon library dependency.
    // New icon = one path entry here, usable everywhere immediately.
    const strokeIcons = {
        check: 'M20 6 9 17l-5-5',
        close: 'M18 6 6 18M6 6l12 12',
        warning: 'M12 3 2 20h20L12 3Zm0 6v5m0 3h.01',
        info: 'M12 16v-4m0-4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
        search: 'm21 21-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z',
        'chevron-down': 'm6 9 6 6 6-6',
        'chevron-left': 'm15 18-6-6 6-6',
        'chevron-right': 'm9 18 6-6-6-6',
        'chevron-double-left': 'm18 17-5-5 5-5M11 17l-5-5 5-5',
        'chevron-double-right': 'm6 17 5-5-5-5M13 17l5-5-5-5',
        home: 'M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9',
        mail: 'M3 6h18v12H3zM3 6l9 7 9-7',
        user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0',
        'more-horizontal': 'M5 12h.01M12 12h.01M19 12h.01',
        cart: 'M3 3h2l2.4 12.2a2 2 0 0 0 2 1.8h8.2a2 2 0 0 0 2-1.6L21 8H6',
        plus: 'M12 5v14M5 12h14',
        eye: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
        star: 'M12 2l2.9 6.6 7.1.6-5.4 4.7L18.2 21 12 17.3 5.8 21l1.6-7.1L2 9.2l7.1-.6L12 2Z',
    };

    // Solid-fill icons (badges/decorative glyphs) — filled shape instead of stroke.
    const fillIcons = {
        'star-filled': strokeIcons.star,
        crown: 'M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8Zm2 12h14v2H5v-2Z',
        diamond: 'M6 3h12l4 6-10 12L2 9Z',
        skull: 'M12 2a8 8 0 0 0-8 8c0 3 1.5 5 3 6.5V20a1 1 0 0 0 1 1h1.5v-2h1v2h2v-2h1v2H17a1 1 0 0 0 1-1v-3.5c1.5-1.5 3-3.5 3-6.5a8 8 0 0 0-8-8Zm-3 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z',
        flame: 'M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-3 2 1 3 3 3 5a5 5 0 0 1-10 0c0-4 3-6 5-10Z',
    };

    const isFill = $derived(name in fillIcons);
    const d = $derived(fillIcons[name] ?? strokeIcons[name] ?? '');
</script>

{#if isFill}
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
        <path d={d} />
    </svg>
{:else}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
        stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d={d} />
    </svg>
{/if}
