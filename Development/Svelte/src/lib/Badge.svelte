<script>
    import Icon from './icons/Icon.svelte';

    let { variant = 'new', label = '' } = $props(); // variant: new | hot | event | limited | vip

    const meta = {
        new: { icon: 'star-filled', text: 'NEW' },
        hot: { icon: 'flame', text: 'HOT' },
        event: { icon: 'info', text: 'EVENT' },
        limited: { icon: 'diamond', text: 'LIMITED' },
        vip: { icon: 'crown', text: 'VIP' },
    };
    const m = $derived(meta[variant] ?? meta.new);
</script>

<span class="ol-badge ol-badge--{variant}">
    <Icon name={m.icon} size={11} color="currentColor" />
    {label || m.text}
</span>

<style>
    .ol-badge {
        display: inline-flex;
        align-items: center;
        gap: calc(4 * var(--px-to-vh) * var(--scale));
        padding: calc(4 * var(--px-to-vh) * var(--scale)) calc(10 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-full);
        font-size: var(--ol-fs-caption);
        font-weight: 700;
        letter-spacing: 0.03em;
        color: var(--ol-white);
    }

    .ol-badge--new { background: var(--ol-primary); }
    .ol-badge--hot { background: var(--ol-danger); }
    .ol-badge--event { background: var(--ol-info); }
    .ol-badge--limited { background: linear-gradient(135deg, var(--ol-gold), #b45309); color: var(--ol-bg); }
    .ol-badge--vip { background: linear-gradient(135deg, var(--ol-primary-light), var(--ol-primary-dark)); }
</style>
