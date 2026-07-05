<script>
    import Icon from './icons/Icon.svelte';

    let {
        value = $bindable(''),
        type = 'text',
        placeholder = '',
        icon = '',
        disabled = false,
        invalid = false,
        onkeydown = () => {},
    } = $props();
</script>

<div class="ol-input-wrap" class:ol-input-wrap--invalid={invalid} class:ol-input-wrap--disabled={disabled}>
    {#if icon}
        <Icon name={icon} size={15} color="var(--ol-muted)" />
    {/if}
    <input class="ol-input" {type} {placeholder} {disabled} bind:value {onkeydown} />
</div>

<style>
    .ol-input-wrap {
        display: flex;
        align-items: center;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
        background: var(--ol-input-bg);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-radius: var(--ol-radius-md);
        padding: 0 calc(14 * var(--px-to-vh) * var(--scale));
        transition: border-color var(--ol-transition);
    }

    .ol-input-wrap:focus-within { border-color: var(--ol-primary-light); }
    .ol-input-wrap--invalid { border-color: var(--ol-danger); }
    .ol-input-wrap--disabled { opacity: 0.6; }

    .ol-input {
        flex: 1;
        min-width: 0;
        background: none;
        padding: calc(12 * var(--px-to-vh) * var(--scale)) 0;
        font-size: var(--ol-fs-body2);
        color: var(--ol-white);
    }

    .ol-input::placeholder { color: var(--ol-muted); }
</style>
