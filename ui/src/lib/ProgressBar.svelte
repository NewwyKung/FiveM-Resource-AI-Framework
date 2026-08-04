<script>
    let { value = 0, max = 100, showLabel = true } = $props();

    const pct = $derived(Math.min(100, Math.max(0, (value / max) * 100)));
</script>

<div class="ol-progress">
    <div class="ol-progress__track">
        <div class="ol-progress__fill" style:width="{pct}%"></div>
    </div>
    {#if showLabel}<span class="ol-progress__label">{Math.round(pct)}%</span>{/if}
</div>

<style>
    .ol-progress {
        display: flex;
        align-items: center;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
    }

    .ol-progress__track {
        flex: 1;
        height: calc(8 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-full);
        background: rgba(255, 255, 255, 0.08);
        overflow: hidden;
    }

    .ol-progress__fill {
        height: 100%;
        border-radius: var(--ol-radius-full);
        background: linear-gradient(90deg, var(--ol-primary), var(--ol-primary-light));
        transition: width var(--ol-transition);
    }

    .ol-progress__label {
        flex-shrink: 0;
        font-size: var(--ol-fs-caption);
        color: var(--ol-muted);
    }
</style>
