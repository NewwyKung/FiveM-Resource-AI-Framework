<script>
    let { group = $bindable(), value, disabled = false, label = '' } = $props();
</script>

<label class="ol-radio" class:ol-radio--disabled={disabled}>
    <input class="ol-radio__input" type="radio" bind:group {value} {disabled} />
    <span class="ol-radio__dot"></span>
    {#if label}<span class="ol-radio__label">{label}</span>{/if}
</label>

<style>
    .ol-radio {
        display: inline-flex;
        align-items: center;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
        cursor: pointer;
    }

    .ol-radio--disabled { opacity: 0.5; cursor: not-allowed; }

    .ol-radio__input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    }

    .ol-radio__dot {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(20 * var(--px-to-vh) * var(--scale));
        height: calc(20 * var(--px-to-vh) * var(--scale));
        border-radius: 50%;
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border-strong);
        background: var(--ol-input-bg);
        transition: border-color var(--ol-transition);
    }

    .ol-radio__dot::after {
        content: '';
        width: calc(10 * var(--px-to-vh) * var(--scale));
        height: calc(10 * var(--px-to-vh) * var(--scale));
        border-radius: 50%;
        background: var(--ol-primary);
        transform: scale(0);
        transition: transform var(--ol-transition);
    }

    .ol-radio__input:checked ~ .ol-radio__dot { border-color: var(--ol-primary); }
    .ol-radio__input:checked ~ .ol-radio__dot::after { transform: scale(1); }
    .ol-radio__input:focus-visible ~ .ol-radio__dot { border-color: var(--ol-primary-light); }

    .ol-radio__label {
        font-size: var(--ol-fs-body2);
        color: var(--ol-white);
    }
</style>
