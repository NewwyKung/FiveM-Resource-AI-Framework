<script>
    import Icon from './icons/Icon.svelte';
    import IconButton from './IconButton.svelte';

    let { amount = 0, onAdd = null } = $props();
</script>

<div class="ol-currency-pill">
    <Icon name="diamond" size={16} color="var(--ol-primary-light)" />
    <span class="ol-currency-pill__amount">{amount.toLocaleString()}</span>
    {#if onAdd}
        <IconButton icon="plus" size="sm" variant="primary" label="เติมเงิน" onclick={onAdd} />
    {/if}
</div>

<style>
    .ol-currency-pill {
        display: inline-flex;
        align-items: center;
        gap: calc(8 * var(--px-to-vh) * var(--scale));
        padding: calc(8 * var(--px-to-vh) * var(--scale)) calc(14 * var(--px-to-vh) * var(--scale));
        background: var(--ol-surface);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
        border-radius: var(--ol-radius-full);
        font-size: var(--ol-fs-body2);
        font-weight: 600;
    }
</style>
