export const scriptName = window.GetParentResourceName ? window.GetParentResourceName() : 'SCRIPT_NAME';

// FiveM's CEF routes NUI fetches by document context, not by hostname, so the literal
// host below doesn't need to match the resource name. In a plain browser (npm run dev /
// preview tools) that fetch has nowhere to go — isBrowser flags that case so App.svelte
// can simulate the SET_READY/SET_VISIBLE open sequence instead of staying hidden forever.
export const isBrowser = typeof window.invokeNative !== 'function';

export const Post = async (action = '', data = {}) => fetch(`https://${scriptName}/${action}`, {
    method: 'POST',
    body: JSON.stringify(data)
});