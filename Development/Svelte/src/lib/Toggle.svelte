<script>
    let { checked = $bindable(false), disabled = false, label = 'toggle', onchange = () => {} } = $props();
</script>

<button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    class="ol-toggle"
    class:ol-toggle--checked={checked}
    {disabled}
    onclick={() => {
        checked = !checked;
        onchange(checked);
    }}
>
    <span class="ol-toggle__thumb"></span>
</button>

<style>
    .ol-toggle {
        flex-shrink: 0;
        position: relative;
        width: calc(40 * var(--px-to-vh) * var(--scale));
        height: calc(22 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-full);
        background: rgba(255, 255, 255, 0.12);
        transition: background-color var(--ol-transition);
    }

    .ol-toggle--checked { background: var(--ol-primary); }
    .ol-toggle:disabled { opacity: 0.4; cursor: not-allowed; }

    .ol-toggle__thumb {
        position: absolute;
        top: calc(3 * var(--px-to-vh) * var(--scale));
        left: calc(3 * var(--px-to-vh) * var(--scale));
        width: calc(16 * var(--px-to-vh) * var(--scale));
        height: calc(16 * var(--px-to-vh) * var(--scale));
        border-radius: 50%;
        background: var(--ol-white);
        transition: transform var(--ol-transition);
    }

    .ol-toggle--checked .ol-toggle__thumb {
        transform: translateX(calc(18 * var(--px-to-vh) * var(--scale)));
    }
</style>
