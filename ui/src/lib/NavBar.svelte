<script>
    import Icon from './icons/Icon.svelte';

    let { items = [], active = $bindable(''), onchange = () => {} } = $props(); // items: [{ value, label, icon }]
</script>

<nav class="ol-navbar">
    {#each items as item (item.value)}
        <button
            type="button"
            class="ol-navbar__item"
            class:ol-navbar__item--active={item.value === active}
            onclick={() => {
                active = item.value;
                onchange(item.value);
            }}
        >
            <Icon name={item.icon} size={16} />
            <span>{item.label}</span>
        </button>
    {/each}
</nav>

<style>
    .ol-navbar {
        display: flex;
        gap: calc(6 * var(--px-to-vh) * var(--scale));
        padding: calc(6 * var(--px-to-vh) * var(--scale));
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-radius: var(--ol-radius-full);
    }

    .ol-navbar__item {
        display: flex;
        align-items: center;
        gap: calc(8 * var(--px-to-vh) * var(--scale));
        padding: calc(10 * var(--px-to-vh) * var(--scale)) calc(18 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-full);
        font-size: var(--ol-fs-body2);
        font-weight: 500;
        color: var(--ol-muted);
        transition: background-color var(--ol-transition), color var(--ol-transition);
    }

    .ol-navbar__item:hover { color: var(--ol-white); }

    .ol-navbar__item--active {
        background: var(--ol-primary);
        color: var(--ol-white);
    }
</style>
