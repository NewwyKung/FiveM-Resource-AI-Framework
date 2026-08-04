<script>
    import Icon from './icons/Icon.svelte';

    let { value = 0, max = 5, interactive = false, onchange = () => {} } = $props();
</script>

<div class="ol-rating">
    {#each { length: max } as _, i (i)}
        <button
            type="button"
            class="ol-rating__star"
            class:ol-rating__star--filled={i < value}
            class:ol-rating__star--interactive={interactive}
            disabled={!interactive}
            onclick={() => interactive && onchange(i + 1)}
        >
            <Icon name={i < value ? 'star-filled' : 'star'} size={16} />
        </button>
    {/each}
</div>

<style>
    .ol-rating {
        display: inline-flex;
        gap: calc(4 * var(--px-to-vh) * var(--scale));
    }

    .ol-rating__star {
        color: var(--ol-muted);
    }

    .ol-rating__star--filled { color: var(--ol-gold); }
    .ol-rating__star--interactive:hover { color: var(--ol-gold); }
</style>
