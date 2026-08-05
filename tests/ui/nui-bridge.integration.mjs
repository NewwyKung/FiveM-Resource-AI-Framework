import process from 'node:process';

const originalWindow = globalThis.window;
const originalFetch = globalThis.fetch;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function jsonResponse(payload) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

async function expectCode(promise, code) {
  try {
    await promise;
  } catch (error) {
    assert(error?.code === code, `expected ${code}, received ${error?.code ?? error}`);
    return error;
  }
  throw new Error(`expected ${code}, but the callback resolved`);
}

try {
  globalThis.window = {
    GetParentResourceName: () => 'test_resource',
    setTimeout,
    clearTimeout,
    addEventListener() {},
    removeEventListener() {},
    postMessage() {},
  };

  const bridge = await import(`../../resource/ui/src/js/NuiBridge.js?integration=${Date.now()}`);

  globalThis.fetch = async () => jsonResponse({ ok: true, data: {} });
  await expectCode(
    bridge.sendNuiCallback('LOAD', {}, { requestId: 'missing-id' }),
    'NUI_STALE_RESPONSE',
  );

  globalThis.fetch = async () => jsonResponse({ ok: true, data: {}, requestId: 'different-id' });
  await expectCode(
    bridge.sendNuiCallback('LOAD', {}, { requestId: 'expected-id' }),
    'NUI_STALE_RESPONSE',
  );

  globalThis.fetch = async (_url, options) => {
    const request = JSON.parse(options.body);
    return jsonResponse({ ok: true, data: { accepted: true }, requestId: request.requestId });
  };
  const valid = await bridge.sendNuiCallback('LOAD', {}, { requestId: 'valid-id' });
  assert(valid.data.accepted === true, 'matching request ID response was not accepted');

  let fetchCalls = 0;
  globalThis.fetch = async (_url, options) => {
    fetchCalls += 1;
    return new Promise((_resolve, reject) => {
      options.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
    });
  };

  const pending = bridge.sendIdempotentNuiCallback('LOAD', {}, {
    idempotent: true,
    retries: 2,
    requestId: 'dispose-id',
  });
  bridge.disposeNuiBridge();
  await expectCode(pending, 'NUI_DISPOSED');
  assert(fetchCalls === 1, `disposed callback retried ${fetchCalls} times`);
  await expectCode(bridge.sendNuiCallback('LOAD'), 'NUI_DISPOSED');
  assert(bridge.getNuiDiagnostics().disposed === true, 'bridge diagnostics did not report disposal');

  console.log('[nui-bridge-test] request correlation and disposal validation passed.');
} catch (error) {
  console.error(`[nui-bridge-test] ${error.stack || error.message}`);
  process.exitCode = 1;
} finally {
  globalThis.window = originalWindow;
  globalThis.fetch = originalFetch;
}
