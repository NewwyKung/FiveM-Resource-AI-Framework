<script>
    import Icon from './icons/Icon.svelte';
    import IconButton from './IconButton.svelte';

    let { variant = 'success', title = '', message = '', onclose = () => {} } = $props(); // variant: success | warning | error

    const meta = {
        success: { icon: 'check' },
        warning: { icon: 'warning' },
        error: { icon: 'close' },
    };
    const m = $derived(meta[variant] ?? meta.success);
</script>

<div class="ol-toast ol-toast--{variant}">
    <span class="ol-toast__icon"><Icon name={m.icon} size={15} color="var(--ol-white)" /></span>
    <div class="ol-toast__text">
        {#if title}<p class="ol-toast__title">{title}</p>{/if}
        {#if message}<p class="ol-toast__message">{message}</p>{/if}
    </div>
    <IconButton icon="close" size="sm" variant="surface" label="ปิด" onclick={onclose} />
</div>

<style>
    .ol-toast {
        display: flex;
        align-items: flex-start;
        gap: calc(12 * var(--px-to-vh) * var(--scale));
        padding: calc(12 * var(--px-to-vh) * var(--scale)) calc(14 * var(--px-to-vh) * var(--scale));
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-left: calc(3 * var(--px-to-vh) * var(--scale)) solid transparent;
        border-radius: var(--ol-radius-md);
        box-shadow: 0 calc(10 * var(--px-to-vh) * var(--scale)) calc(24 * var(--px-to-vh) * var(--scale)) rgba(0, 0, 0, 0.3);
    }

    .ol-toast__icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(28 * var(--px-to-vh) * var(--scale));
        height: calc(28 * var(--px-to-vh) * var(--scale));
        border-radius: 50%;
    }

    .ol-toast--success { border-left-color: var(--ol-success); }
    .ol-toast--success .ol-toast__icon { background: var(--ol-success); }

    .ol-toast--warning { border-left-color: var(--ol-warning); }
    .ol-toast--warning .ol-toast__icon { background: var(--ol-warning); }

    .ol-toast--error { border-left-color: var(--ol-danger); }
    .ol-toast--error .ol-toast__icon { background: var(--ol-danger); }

    .ol-toast__text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: calc(2 * var(--px-to-vh) * var(--scale));
    }

    .ol-toast__title {
        margin: 0;
        font-size: var(--ol-fs-body2);
        font-weight: 600;
    }

    .ol-toast__message {
        margin: 0;
        font-size: var(--ol-fs-caption);
        color: var(--ol-muted);
    }
</style>
