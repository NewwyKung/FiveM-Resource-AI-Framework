<script>
    let { tabs = [], active = $bindable(''), onchange = () => {} } = $props(); // tabs: [{ value, label }]
</script>

<div class="ol-tabs">
    {#each tabs as tab (tab.value)}
        <button
            type="button"
            class="ol-tabs__tab"
            class:ol-tabs__tab--active={tab.value === active}
            onclick={() => {
                active = tab.value;
                onchange(tab.value);
            }}
        >
            {tab.label}
        </button>
    {/each}
</div>

<style>
    .ol-tabs {
        display: flex;
        gap: calc(6 * var(--px-to-vh) * var(--scale));
        padding: calc(6 * var(--px-to-vh) * var(--scale));
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-radius: var(--ol-radius-md);
    }

    .ol-tabs__tab {
        flex: 1;
        padding: calc(10 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-sm);
        font-size: var(--ol-fs-body2);
        font-weight: 500;
        color: var(--ol-muted);
        text-align: center;
        transition: background-color var(--ol-transition), color var(--ol-transition);
    }

    .ol-tabs__tab:hover { color: var(--ol-white); }

    .ol-tabs__tab--active {
        background: var(--ol-primary);
        color: var(--ol-white);
    }
</style>
