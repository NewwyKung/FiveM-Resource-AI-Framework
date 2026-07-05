<script>
    import Icon from './icons/Icon.svelte';

    let { items = [], active = $bindable(''), onchange = () => {} } = $props(); // items: [{ value, label, icon, raised }]
</script>

<nav class="ol-bottomnav">
    {#each items as item (item.value)}
        <button
            type="button"
            class="ol-bottomnav__item"
            class:ol-bottomnav__item--active={item.value === active}
            class:ol-bottomnav__item--raised={item.raised}
            onclick={() => {
                active = item.value;
                onchange(item.value);
            }}
        >
            <span class="ol-bottomnav__icon">
                <Icon name={item.icon} size={item.raised ? 20 : 16} />
            </span>
            {#if item.label && !item.raised}
                <span class="ol-bottomnav__label">{item.label}</span>
            {/if}
        </button>
    {/each}
</nav>

<style>
    .ol-bottomnav {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: calc(10 * var(--px-to-vh) * var(--scale)) calc(8 * var(--px-to-vh) * var(--scale));
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-radius: var(--ol-radius-lg);
    }

    .ol-bottomnav__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(4 * var(--px-to-vh) * var(--scale));
        color: var(--ol-muted);
    }

    .ol-bottomnav__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(38 * var(--px-to-vh) * var(--scale));
        height: calc(38 * var(--px-to-vh) * var(--scale));
        border-radius: 50%;
        transition: background-color var(--ol-transition), color var(--ol-transition);
    }

    .ol-bottomnav__label {
        font-size: var(--ol-fs-caption);
    }

    .ol-bottomnav__item--active .ol-bottomnav__icon,
    .ol-bottomnav__item:hover .ol-bottomnav__icon {
        color: var(--ol-white);
    }

    .ol-bottomnav__item--raised {
        margin-top: calc(-22 * var(--px-to-vh) * var(--scale));
    }

    .ol-bottomnav__item--raised .ol-bottomnav__icon {
        width: calc(52 * var(--px-to-vh) * var(--scale));
        height: calc(52 * var(--px-to-vh) * var(--scale));
        background: var(--ol-primary);
        color: var(--ol-white);
        border: calc(4 * var(--px-to-vh) * var(--scale)) solid var(--ol-bg);
        box-shadow: var(--ol-glow);
    }

    .ol-bottomnav__item--raised.ol-bottomnav__item--active .ol-bottomnav__icon {
        background: var(--ol-primary-light);
    }
</style>
