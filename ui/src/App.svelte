<script>
    import { onMount } from 'svelte';
    import Visible from './provider/Visible.svelte';
    import { isBrowser } from './js/Post';
    import ComponentShowcase from './lib/ComponentShowcase.svelte';

    const onMessage = (action, data) => {
        switch(action) {
            case 'INIT':
                // DO SOMETHING
                break;
            default:
        }
    }

    onMount(() => {
        if (isBrowser) {
            // no Lua backing this page outside FiveM — simulate the open sequence so
            // `npm run dev` shows the UI instead of staying hidden forever.
            window.postMessage({ action: 'SET_READY' }, '*');
            window.postMessage({ action: 'SET_VISIBLE', data: { visible: true } }, '*');
        }
    });
</script>

<Visible {onMessage}>
    <ComponentShowcase />
</Visible>

<style>
</style>
