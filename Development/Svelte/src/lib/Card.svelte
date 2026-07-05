<script>
    let { size = 'default', image = '', title = '', subtitle = '', price = '', children } = $props(); // size: default | small
</script>

<div class="ol-card ol-card--{size}">
    {#if image}
        <div class="ol-card__image" style:background-image="url({image})"></div>
    {/if}
    <div class="ol-card__body">
        {#if title}<h4 class="ol-card__title">{title}</h4>{/if}
        {#if subtitle}<p class="ol-card__subtitle">{subtitle}</p>{/if}
        {#if price || children}
            <div class="ol-card__footer">
                {#if price}<span class="ol-card__price">{price}</span>{/if}
                {@render children?.()}
            </div>
        {/if}
    </div>
</div>

<style>
    .ol-card {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-radius: var(--ol-radius-lg);
        transition: border-color var(--ol-transition), transform var(--ol-transition), box-shadow var(--ol-transition);
    }

    .ol-card:hover {
        border-color: var(--ol-border-strong);
        transform: translateY(calc(-2 * var(--px-to-vh) * var(--scale)));
        box-shadow: 0 calc(12 * var(--px-to-vh) * var(--scale)) calc(30 * var(--px-to-vh) * var(--scale)) rgba(0, 0, 0, 0.35);
    }

    .ol-card__image {
        background-size: cover;
        background-position: center;
        background-color: rgba(255, 255, 255, 0.04);
    }

    .ol-card--default .ol-card__image { height: calc(120 * var(--px-to-vh) * var(--scale)); }
    .ol-card--small .ol-card__image { height: calc(80 * var(--px-to-vh) * var(--scale)); }

    .ol-card__body {
        display: flex;
        flex-direction: column;
        gap: calc(6 * var(--px-to-vh) * var(--scale));
        padding: calc(14 * var(--px-to-vh) * var(--scale));
    }

    .ol-card--small .ol-card__body { padding: calc(10 * var(--px-to-vh) * var(--scale)); }

    .ol-card__title {
        margin: 0;
        font-size: var(--ol-fs-body1);
        font-weight: 700;
    }

    .ol-card--small .ol-card__title { font-size: var(--ol-fs-body2); }

    .ol-card__subtitle {
        margin: 0;
        font-size: var(--ol-fs-caption);
        color: var(--ol-muted);
        line-height: 1.5;
    }

    .ol-card__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
        margin-top: calc(4 * var(--px-to-vh) * var(--scale));
    }

    .ol-card__price {
        display: flex;
        align-items: center;
        gap: calc(4 * var(--px-to-vh) * var(--scale));
        font-size: var(--ol-fs-body2);
        font-weight: 600;
        color: var(--ol-primary-light);
    }
</style>
