<script>
    import Icon from './icons/Icon.svelte';

    let {
        value = $bindable(''),
        options = [],       // [{ value, label }]
        placeholder = 'เลือกตัวเลือก',
        disabled = false,
    } = $props();
</script>

<div class="ol-select-wrap" class:ol-select-wrap--disabled={disabled}>
    <select class="ol-select" bind:value {disabled}>
        <option value="" disabled hidden>{placeholder}</option>
        {#each options as opt (opt.value)}
            <option value={opt.value}>{opt.label}</option>
        {/each}
    </select>
    <Icon name="chevron-down" size={14} color="var(--ol-muted)" />
</div>

<style>
    .ol-select-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
        background: var(--ol-input-bg);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-radius: var(--ol-radius-md);
        padding: 0 calc(14 * var(--px-to-vh) * var(--scale));
        transition: border-color var(--ol-transition);
    }

    .ol-select-wrap:focus-within { border-color: var(--ol-primary-light); }
    .ol-select-wrap--disabled { opacity: 0.6; }

    .ol-select {
        flex: 1;
        min-width: 0;
        appearance: none;
        background: none;
        padding: calc(12 * var(--px-to-vh) * var(--scale)) 0;
        font-size: var(--ol-fs-body2);
        color: var(--ol-white);
    }

    .ol-select option { background: var(--ol-surface); }
</style>
