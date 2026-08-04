<script>
    import Icon from './icons/Icon.svelte';

    let { src = '', size = 'md', status = '' } = $props(); // size: sm | md | lg ; status: online | offline | ''
</script>

<div class="ol-avatar ol-avatar--{size}">
    {#if src}
        <img class="ol-avatar__img" {src} alt="" />
    {:else}
        <Icon name="user" size={size === 'lg' ? 22 : size === 'sm' ? 14 : 18} color="var(--ol-white)" />
    {/if}
    {#if status}
        <span class="ol-avatar__status ol-avatar__status--{status}"></span>
    {/if}
</div>

<style>
    .ol-avatar {
        position: relative;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: linear-gradient(160deg, var(--ol-primary), var(--ol-primary-dark));
        overflow: hidden;
    }

    .ol-avatar--sm { width: calc(30 * var(--px-to-vh) * var(--scale)); height: calc(30 * var(--px-to-vh) * var(--scale)); }
    .ol-avatar--md { width: calc(44 * var(--px-to-vh) * var(--scale)); height: calc(44 * var(--px-to-vh) * var(--scale)); }
    .ol-avatar--lg { width: calc(64 * var(--px-to-vh) * var(--scale)); height: calc(64 * var(--px-to-vh) * var(--scale)); }

    .ol-avatar__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .ol-avatar__status {
        position: absolute;
        right: 0;
        bottom: 0;
        width: calc(11 * var(--px-to-vh) * var(--scale));
        height: calc(11 * var(--px-to-vh) * var(--scale));
        border-radius: 50%;
        border: calc(2 * var(--px-to-vh) * var(--scale)) solid var(--ol-bg);
    }

    .ol-avatar__status--online { background: var(--ol-success); }
    .ol-avatar__status--offline { background: var(--ol-muted); }
</style>
