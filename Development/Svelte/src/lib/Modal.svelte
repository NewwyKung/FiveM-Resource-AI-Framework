<script>
    import Icon from './icons/Icon.svelte';
    import IconButton from './IconButton.svelte';

    let {
        open = $bindable(false),
        icon = 'warning',
        title = '',
        description = '',
        onclose = () => {},
        children,
    } = $props();

    function close() {
        open = false;
        onclose();
    }

    function handleKeydown(e) {
        if (open && e.key === 'Escape') close();
    }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="ol-modal-overlay" onclick={close}>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="ol-modal" role="dialog" aria-modal="true" tabindex="-1" onclick={(e) => e.stopPropagation()}>
            <div class="ol-modal__close">
                <IconButton icon="close" size="sm" variant="surface" label="ปิด" onclick={close} />
            </div>
            {#if icon}
                <span class="ol-modal__icon"><Icon name={icon} size={26} color="var(--ol-primary-light)" /></span>
            {/if}
            {#if title}<h3 class="ol-modal__title">{title}</h3>{/if}
            {#if description}<p class="ol-modal__description">{description}</p>{/if}
            {#if children}
                <div class="ol-modal__actions">
                    {@render children()}
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    .ol-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.7);
    }

    .ol-modal {
        position: relative;
        width: calc(360 * var(--px-to-vh) * var(--scale));
        max-width: 90vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: calc(8 * var(--px-to-vh) * var(--scale));
        padding: calc(28 * var(--px-to-vh) * var(--scale)) calc(24 * var(--px-to-vh) * var(--scale));
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border-strong);
        border-radius: var(--ol-radius-lg);
        box-shadow: 0 calc(20 * var(--px-to-vh) * var(--scale)) calc(50 * var(--px-to-vh) * var(--scale)) rgba(0, 0, 0, 0.5);
    }

    .ol-modal__close {
        position: absolute;
        top: calc(12 * var(--px-to-vh) * var(--scale));
        right: calc(12 * var(--px-to-vh) * var(--scale));
    }

    .ol-modal__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(56 * var(--px-to-vh) * var(--scale));
        height: calc(56 * var(--px-to-vh) * var(--scale));
        margin-bottom: calc(6 * var(--px-to-vh) * var(--scale));
        border-radius: 50%;
        background: rgba(139, 92, 246, 0.14);
    }

    .ol-modal__title {
        margin: 0;
        font-size: var(--ol-fs-h3);
        font-weight: 700;
    }

    .ol-modal__description {
        margin: 0;
        font-size: var(--ol-fs-body2);
        color: var(--ol-muted);
        line-height: 1.5;
    }

    .ol-modal__actions {
        display: flex;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
        margin-top: calc(14 * var(--px-to-vh) * var(--scale));
        width: 100%;
    }

    .ol-modal__actions :global(.ol-btn) {
        flex: 1;
    }
</style>
