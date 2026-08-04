<script>
    import IconButton from './IconButton.svelte';

    let { page = $bindable(1), total = 1, onchange = () => {} } = $props();

    function go(p) {
        if (p < 1 || p > total) return;
        page = p;
        onchange(p);
    }
</script>

<div class="ol-pagination">
    <IconButton icon="chevron-double-left" size="sm" disabled={page === 1} label="หน้าแรก" onclick={() => go(1)} />
    {#each { length: total } as _, i (i)}
        <button
            type="button"
            class="ol-pagination__page"
            class:ol-pagination__page--active={i + 1 === page}
            onclick={() => go(i + 1)}
        >
            {i + 1}
        </button>
    {/each}
    <IconButton icon="chevron-double-right" size="sm" disabled={page === total} label="หน้าสุดท้าย" onclick={() => go(total)} />
</div>

<style>
    .ol-pagination {
        display: flex;
        align-items: center;
        gap: calc(6 * var(--px-to-vh) * var(--scale));
    }

    .ol-pagination__page {
        width: calc(30 * var(--px-to-vh) * var(--scale));
        height: calc(30 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-sm);
        font-size: var(--ol-fs-body2);
        color: var(--ol-muted);
        transition: background-color var(--ol-transition), color var(--ol-transition);
    }

    .ol-pagination__page:hover { color: var(--ol-white); }

    .ol-pagination__page--active {
        background: var(--ol-primary);
        color: var(--ol-white);
    }
</style>
