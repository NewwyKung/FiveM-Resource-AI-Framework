<script>
    import { dispatchNuiMessage, sendNuiCallback } from '../js/NuiBridge.js';

    let { children, onMessage = () => {} } = $props();

    let isReady = $state(false);
    let visible = $state(false);

    const messageListener = (event) => {
        const message = event?.data;
        if (!message || typeof message.action !== 'string') return;

        const { action, data } = message;

        if (action === 'SET_READY') {
            isReady = true;
            return;
        }

        if (!isReady) return;

        if (action === 'SET_VISIBLE') {
            visible = data?.visible === true;
            return;
        }

        const handled = dispatchNuiMessage(message);
        if (!handled) onMessage(action, data);
    };

    const keydownListener = (event) => {
        if (event.key !== 'Escape') return;
        void sendNuiCallback('CLOSE_UI').catch(() => {});
    };
</script>

<svelte:window onmessage={messageListener} onkeydown={keydownListener} />

<div class="visible-wrapper" class:hidden={!visible || !isReady}>
    {@render children()}
</div>

<style>
    .visible-wrapper {
        display: block;
        width: 100%;
        height: 100%;
    }

    .hidden {
        display: none;
    }
</style>
