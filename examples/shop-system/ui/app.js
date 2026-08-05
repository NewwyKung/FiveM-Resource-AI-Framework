const shop = document.querySelector('#shop');
const items = document.querySelector('#items');
const status = document.querySelector('#status');
const resourceName = window.GetParentResourceName?.() || 'example_shop_system';
const purchaseButtons = new Set();
let requestSequence = 0;
let pendingRequestId = null;
let resultTimeoutId = null;

async function post(action, data = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`https://${resourceName}/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw new Error('request timed out');
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function setPurchasePending(requestId) {
  pendingRequestId = requestId;
  for (const button of purchaseButtons) button.disabled = requestId !== null;
}

function clearResultTimeout() {
  if (resultTimeoutId !== null) window.clearTimeout(resultTimeoutId);
  resultTimeoutId = null;
}

function renderItems(catalog) {
  items.replaceChildren(...Object.entries(catalog).map(([itemId, item]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${item.label} - $${item.price}`;
    purchaseButtons.add(button);
    button.addEventListener('click', async () => {
      if (pendingRequestId !== null) return;

      requestSequence = (requestSequence + 1) % Number.MAX_SAFE_INTEGER;
      const requestId = `shop:${Date.now()}:${requestSequence}`;
      setPurchasePending(requestId);
      status.textContent = 'Submitting...';
      try {
        const accepted = await post('purchase', { requestId, itemId, quantity: 1 });
        if (!accepted?.ok || accepted.requestId !== requestId) throw new Error(accepted?.error || 'invalid acknowledgement');
        resultTimeoutId = window.setTimeout(() => {
          if (pendingRequestId !== requestId) return;
          setPurchasePending(null);
          status.textContent = 'Purchase result timed out.';
        }, 7000);
      } catch (error) {
        clearResultTimeout();
        setPurchasePending(null);
        status.textContent = `Request failed: ${error.message}`;
      }
    });
    return button;
  }));
}

window.addEventListener('message', ({ data }) => {
  if (data?.action === 'open') {
    purchaseButtons.clear();
    renderItems(data.data.items);
    status.textContent = '';
    shop.hidden = false;
  } else if (data?.action === 'close') {
    clearResultTimeout();
    setPurchasePending(null);
    shop.hidden = true;
  } else if (data?.action === 'purchaseResult') {
    if (!data.data || data.data.requestId !== pendingRequestId) return;
    clearResultTimeout();
    setPurchasePending(null);
    status.textContent = data.data.ok
      ? `Purchased. Balance: $${data.data.data.balance}`
      : `Purchase failed: ${data.data.error}`;
  }
});

async function requestClose() {
  try {
    await post('close');
  } catch (error) {
    status.textContent = `Close failed: ${error.message}`;
  }
}

document.querySelector('#close').addEventListener('click', () => void requestClose());
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') void requestClose();
});
