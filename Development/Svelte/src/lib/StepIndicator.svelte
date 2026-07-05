<script>
    let { steps = [], current = 1 } = $props(); // steps: [{ label }], current: 1-based
</script>

<div class="ol-steps">
    {#each steps as step, i (i)}
        <div class="ol-steps__item">
            <span
                class="ol-steps__circle"
                class:ol-steps__circle--active={i + 1 === current}
                class:ol-steps__circle--done={i + 1 < current}
            >
                {i + 1}
            </span>
            <span class="ol-steps__label">{step.label}</span>
        </div>
        {#if i < steps.length - 1}
            <span class="ol-steps__connector" class:ol-steps__connector--filled={i + 1 < current}></span>
        {/if}
    {/each}
</div>

<style>
    .ol-steps {
        display: flex;
        align-items: center;
    }

    .ol-steps__item {
        display: flex;
        align-items: center;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
    }

    .ol-steps__circle {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(32 * var(--px-to-vh) * var(--scale));
        height: calc(32 * var(--px-to-vh) * var(--scale));
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.06);
        color: var(--ol-muted);
        font-size: var(--ol-fs-body2);
        font-weight: 600;
        transition: background-color var(--ol-transition), color var(--ol-transition);
    }

    .ol-steps__circle--active {
        background: var(--ol-primary);
        color: var(--ol-white);
        box-shadow: var(--ol-glow);
    }

    .ol-steps__circle--done {
        background: rgba(34, 197, 94, 0.18);
        color: var(--ol-success);
    }

    .ol-steps__label {
        font-size: var(--ol-fs-body2);
        color: var(--ol-muted);
        white-space: nowrap;
    }

    .ol-steps__connector {
        width: calc(48 * var(--px-to-vh) * var(--scale));
        height: calc(2 * var(--px-to-vh) * var(--scale));
        margin: 0 calc(10 * var(--px-to-vh) * var(--scale));
        background: rgba(255, 255, 255, 0.1);
    }

    .ol-steps__connector--filled { background: var(--ol-primary); }
</style>
