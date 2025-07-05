<script>
    let { children, onMessage = () => {} } = $props();

    let IS_READY = $state(false);
    let visible = $state(false);

     const listener = (event) => {
        const { action, data } = event.data;
        if(action === 'SET_READY') {
            IS_READY = true;
        }
        else if(IS_READY) {
            if(action === 'SET_VISIBLE') {
                visible = data.visible;
            }else{
                onMessage(action, data)
            }
        }
    }

</script>

<svelte:window onmessage={listener} />
<div class="visible-wrapper" class:hidden={!visible || !IS_READY}>
    {@render children()}
</div>

<style>
    .visible-wrapper {
        display: block;
    }

    .hidden {
        display: none;
    }
</style>