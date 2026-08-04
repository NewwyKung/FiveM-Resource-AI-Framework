<script>
    let {
        variant = 'primary',   // primary | secondary | ghost | danger | disabled
        size = 'md',           // sm | md
        type = 'button',
        disabled = false,
        onclick = () => {},
        children,
    } = $props();

    const isDisabled = $derived(variant === 'disabled' || disabled);
</script>

<button
    class="ol-btn ol-btn--{variant} ol-btn--{size}"
    {type}
    disabled={isDisabled}
    {onclick}
>
    {@render children?.()}
</button>

<style>
    .ol-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: calc(8 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-md);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid transparent;
        font-family: var(--ol-font);
        font-weight: 600;
        white-space: nowrap;
        transition: background-color var(--ol-transition), border-color var(--ol-transition),
            color var(--ol-transition), box-shadow var(--ol-transition), transform var(--ol-transition);
    }

    .ol-btn--md {
        padding: calc(12 * var(--px-to-vh) * var(--scale)) calc(24 * var(--px-to-vh) * var(--scale));
        font-size: var(--ol-fs-body2);
    }

    .ol-btn--sm {
        padding: calc(8 * var(--px-to-vh) * var(--scale)) calc(16 * var(--px-to-vh) * var(--scale));
        font-size: var(--ol-fs-caption);
    }

    .ol-btn--primary { background: var(--ol-primary); color: var(--ol-white); }
    .ol-btn--primary:not(:disabled):hover { background: var(--ol-primary-light); box-shadow: var(--ol-glow); }
    .ol-btn--primary:not(:disabled):active { background: var(--ol-primary-dark); transform: scale(0.97); }

    .ol-btn--secondary { background: var(--ol-surface); border-color: var(--ol-border); color: var(--ol-white); }
    .ol-btn--secondary:not(:disabled):hover { border-color: var(--ol-border-strong); }
    .ol-btn--secondary:not(:disabled):active { transform: scale(0.97); }

    .ol-btn--ghost { background: transparent; border-color: var(--ol-border); color: var(--ol-muted); }
    .ol-btn--ghost:not(:disabled):hover { color: var(--ol-white); border-color: var(--ol-border-strong); }
    .ol-btn--ghost:not(:disabled):active { transform: scale(0.97); }

    .ol-btn--danger { background: rgba(220, 38, 38, 0.12); border-color: var(--ol-danger); color: var(--ol-danger-fg); }
    .ol-btn--danger:not(:disabled):hover { background: var(--ol-danger); color: var(--ol-white); }
    .ol-btn--danger:not(:disabled):active { transform: scale(0.97); }

    .ol-btn--disabled,
    .ol-btn:disabled {
        background: rgba(255, 255, 255, 0.05);
        border-color: transparent;
        color: rgba(255, 255, 255, 0.3);
        cursor: not-allowed;
    }
</style>
