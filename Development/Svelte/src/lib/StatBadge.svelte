<script>
    import Icon from './icons/Icon.svelte';

    let { icon = 'skull', label = '', value = '' } = $props();
</script>

<div class="ol-stat-badge">
    <span class="ol-stat-badge__icon"><Icon name={icon} size={16} color="var(--ol-primary-light)" /></span>
    <div class="ol-stat-badge__text">
        <span class="ol-stat-badge__label">{label}</span>
        <span class="ol-stat-badge__value">{value}</span>
    </div>
</div>

<style>
    .ol-stat-badge {
        display: inline-flex;
        align-items: center;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
        padding: calc(8 * var(--px-to-vh) * var(--scale)) calc(14 * var(--px-to-vh) * var(--scale));
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-radius: var(--ol-radius-md);
    }

    .ol-stat-badge__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(30 * var(--px-to-vh) * var(--scale));
        height: calc(30 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-sm);
        background: rgba(139, 92, 246, 0.14);
    }

    .ol-stat-badge__text {
        display: flex;
        flex-direction: column;
        gap: calc(2 * var(--px-to-vh) * var(--scale));
    }

    .ol-stat-badge__label {
        font-size: var(--ol-fs-caption);
        color: var(--ol-muted);
    }

    .ol-stat-badge__value {
        font-size: var(--ol-fs-body2);
        font-weight: 700;
    }
</style>
