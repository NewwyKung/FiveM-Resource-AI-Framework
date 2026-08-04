<script>
    import Icon from './icons/Icon.svelte';

    let {
        icon = '',
        size = 'md',        // sm | md
        variant = 'ghost',  // ghost | primary | surface
        active = false,
        disabled = false,
        label = '',
        onclick = () => {},
    } = $props();
</script>

<button
    class="ol-icon-btn ol-icon-btn--{variant} ol-icon-btn--{size}"
    class:ol-icon-btn--active={active}
    aria-label={label}
    title={label}
    {disabled}
    {onclick}
>
    <Icon name={icon} size={size === 'sm' ? 14 : 17} />
</button>

<style>
    .ol-icon-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border-radius: var(--ol-radius-full);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid transparent;
        transition: background-color var(--ol-transition), border-color var(--ol-transition), color var(--ol-transition);
    }

    .ol-icon-btn--md { width: calc(38 * var(--px-to-vh) * var(--scale)); height: calc(38 * var(--px-to-vh) * var(--scale)); }
    .ol-icon-btn--sm { width: calc(30 * var(--px-to-vh) * var(--scale)); height: calc(30 * var(--px-to-vh) * var(--scale)); }

    .ol-icon-btn--ghost { background: var(--ol-surface); border-color: var(--ol-border); color: var(--ol-muted); }
    .ol-icon-btn--ghost:not(:disabled):hover { color: var(--ol-white); border-color: var(--ol-border-strong); }

    .ol-icon-btn--primary { background: var(--ol-primary); color: var(--ol-white); }
    .ol-icon-btn--primary:not(:disabled):hover { background: var(--ol-primary-light); }

    .ol-icon-btn--surface { background: rgba(255, 255, 255, 0.06); color: var(--ol-white); }
    .ol-icon-btn--surface:not(:disabled):hover { background: rgba(255, 255, 255, 0.12); }

    .ol-icon-btn--active { background: var(--ol-primary); border-color: transparent; color: var(--ol-white); }

    .ol-icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
