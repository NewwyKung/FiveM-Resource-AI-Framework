<script>
    let { label = '', children } = $props();
</script>

<span class="ol-tooltip">
    {@render children?.()}
    {#if label}<span class="ol-tooltip__bubble">{label}</span>{/if}
</span>

<style>
    .ol-tooltip {
        position: relative;
        display: inline-flex;
    }

    .ol-tooltip__bubble {
        position: absolute;
        bottom: calc(100% + calc(8 * var(--px-to-vh) * var(--scale)));
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        padding: calc(6 * var(--px-to-vh) * var(--scale)) calc(10 * var(--px-to-vh) * var(--scale));
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border-strong);
        border-radius: var(--ol-radius-sm);
        font-size: var(--ol-fs-caption);
        color: var(--ol-white);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--ol-transition);
        pointer-events: none;
        z-index: 30;
    }

    .ol-tooltip:hover .ol-tooltip__bubble,
    .ol-tooltip:focus-within .ol-tooltip__bubble {
        opacity: 1;
        visibility: visible;
    }
</style>
