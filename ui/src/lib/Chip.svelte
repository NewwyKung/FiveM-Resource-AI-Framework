<script>
    let { active = false, onclick = () => {}, children } = $props();
</script>

<button type="button" class="ol-chip" class:ol-chip--active={active} {onclick}>
    {@render children?.()}
</button>

<style>
    .ol-chip {
        display: inline-flex;
        align-items: center;
        gap: calc(6 * var(--px-to-vh) * var(--scale));
        padding: calc(8 * var(--px-to-vh) * var(--scale)) calc(16 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-full);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        background: var(--ol-surface);
        font-size: var(--ol-fs-body2);
        font-weight: 500;
        color: var(--ol-muted);
        transition: background-color var(--ol-transition), border-color var(--ol-transition), color var(--ol-transition);
    }

    .ol-chip:hover { color: var(--ol-white); border-color: var(--ol-border-strong); }

    .ol-chip--active {
        background: var(--ol-primary);
        border-color: transparent;
        color: var(--ol-white);
    }
</style>
