<script>
    import Icon from './icons/Icon.svelte';

    let { checked = $bindable(false), disabled = false, label = '' } = $props();
</script>

<label class="ol-checkbox" class:ol-checkbox--disabled={disabled}>
    <input class="ol-checkbox__input" type="checkbox" bind:checked {disabled} />
    <span class="ol-checkbox__box">
        {#if checked}<Icon name="check" size={12} color="var(--ol-white)" strokeWidth={2.5} />{/if}
    </span>
    {#if label}<span class="ol-checkbox__label">{label}</span>{/if}
</label>

<style>
    .ol-checkbox {
        display: inline-flex;
        align-items: center;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
        cursor: pointer;
    }

    .ol-checkbox--disabled { opacity: 0.5; cursor: not-allowed; }

    .ol-checkbox__input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    }

    .ol-checkbox__box {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(20 * var(--px-to-vh) * var(--scale));
        height: calc(20 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-sm);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border-strong);
        background: var(--ol-input-bg);
        transition: background-color var(--ol-transition), border-color var(--ol-transition);
    }

    .ol-checkbox__input:checked ~ .ol-checkbox__box {
        background: var(--ol-primary);
        border-color: var(--ol-primary);
    }

    .ol-checkbox__input:focus-visible ~ .ol-checkbox__box {
        border-color: var(--ol-primary-light);
    }

    .ol-checkbox__label {
        font-size: var(--ol-fs-body2);
        color: var(--ol-white);
    }
</style>
