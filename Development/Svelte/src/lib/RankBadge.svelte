<script>
    import Icon from './icons/Icon.svelte';

    let { label = 'OVERLORD' } = $props();
</script>

<div class="ol-rank-badge">
    <Icon name="crown" size={22} color="var(--ol-primary-light)" />
    <span class="ol-rank-badge__label">{label}</span>
</div>

<style>
    .ol-rank-badge {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: calc(4 * var(--px-to-vh) * var(--scale));
        padding: calc(10 * var(--px-to-vh) * var(--scale)) calc(16 * var(--px-to-vh) * var(--scale));
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-radius: var(--ol-radius-md);
    }

    .ol-rank-badge__label {
        font-size: var(--ol-fs-caption);
        font-weight: 700;
        font-style: italic;
        letter-spacing: 0.05em;
        background: linear-gradient(135deg, var(--ol-white), var(--ol-primary-light));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
</style>
