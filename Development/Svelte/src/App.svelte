<script>
    import Visible from './provider/Visible.svelte';

    const onMessage = (action, data) => {
        switch(action) {
            case 'INIT':
                // DO SOMETHING
                break;
            default:
        }
    }
</script>

<Visible {onMessage}>
    <h1>Visible Component</h1>
    <p>This component is wrapped in the Visible provider.</p>
</Visible>

<style>
</style>
