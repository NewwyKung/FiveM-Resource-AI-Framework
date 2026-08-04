<script>
    import Icon from './icons/Icon.svelte';

    let {
        value = $bindable(''),
        options = [],       // [{ value, label }]
        placeholder = 'เลือกตัวเลือก',
    } = $props();

    let open = $state(false);

    const selectedLabel = $derived(options.find((o) => o.value === value)?.label ?? placeholder);

    function select(opt) {
        value = opt.value;
        open = false;
    }
</script>

<div class="ol-dropdown">
    <button type="button" class="ol-dropdown__trigger" class:ol-dropdown__trigger--open={open} onclick={() => (open = !open)}>
        <span>{selectedLabel}</span>
        <Icon name="chevron-down" size={14} />
    </button>
    {#if open}
        <ul class="ol-dropdown__menu">
            {#each options as opt (opt.value)}
                <li>
                    <button
                        type="button"
                        class="ol-dropdown__item"
                        class:ol-dropdown__item--active={opt.value === value}
                        onclick={() => select(opt)}
                    >
                        {opt.label}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .ol-dropdown {
        position: relative;
    }

    .ol-dropdown__trigger {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
        background: var(--ol-input-bg);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-radius: var(--ol-radius-md);
        padding: calc(12 * var(--px-to-vh) * var(--scale)) calc(14 * var(--px-to-vh) * var(--scale));
        font-size: var(--ol-fs-body2);
        color: var(--ol-white);
        transition: border-color var(--ol-transition);
    }

    .ol-dropdown__trigger--open { border-color: var(--ol-primary-light); }

    .ol-dropdown__menu {
        position: absolute;
        top: calc(100% + calc(6 * var(--px-to-vh) * var(--scale)));
        left: 0;
        right: 0;
        z-index: 20;
        list-style: none;
        margin: 0;
        padding: calc(6 * var(--px-to-vh) * var(--scale));
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border-strong);
        border-radius: var(--ol-radius-md);
        box-shadow: 0 calc(12 * var(--px-to-vh) * var(--scale)) calc(30 * var(--px-to-vh) * var(--scale)) rgba(0, 0, 0, 0.4);
    }

    .ol-dropdown__item {
        width: 100%;
        text-align: left;
        padding: calc(10 * var(--px-to-vh) * var(--scale)) calc(12 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-sm);
        font-size: var(--ol-fs-body2);
        color: var(--ol-muted);
    }

    .ol-dropdown__item:hover { background: rgba(255, 255, 255, 0.06); color: var(--ol-white); }
    .ol-dropdown__item--active { background: var(--ol-primary); color: var(--ol-white); }
</style>
