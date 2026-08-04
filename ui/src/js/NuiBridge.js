import { isBrowser, Post, scriptName } from './Post.js';

const config = {
    fallbackResourceName: 'resource',
    allowEscapeKey: true,
};

const listeners = new Map();

export function configureNui(options = {}) {
    if (typeof options.fallbackResourceName === 'string' && options.fallbackResourceName.length > 0) {
        config.fallbackResourceName = options.fallbackResourceName;
    }

    if (typeof options.allowEscapeKey === 'boolean') {
        config.allowEscapeKey = options.allowEscapeKey;
    }

    return getNuiConfig();
}

export function getNuiConfig() {
    return Object.freeze({ ...config, resourceName: scriptName || config.fallbackResourceName, isBrowser });
}

export async function sendNuiCallback(action, data = {}) {
    if (typeof action !== 'string' || action.length === 0) {
        throw new TypeError('NUI callback action must be a non-empty string.');
    }

    const response = await Post(action, data);
    const contentType = response.headers.get('content-type') || '';
    return contentType.includes('application/json') ? response.json() : response.text();
}

export function emitNuiMessage(action, data = {}) {
    if (typeof action !== 'string' || action.length === 0) {
        throw new TypeError('NUI message action must be a non-empty string.');
    }

    window.postMessage({ action, data }, '*');
}

export function onNuiMessage(action, callback) {
    if (typeof action !== 'string' || typeof callback !== 'function') {
        throw new TypeError('onNuiMessage requires an action and callback.');
    }

    const handlers = listeners.get(action) || new Set();
    handlers.add(callback);
    listeners.set(action, handlers);

    return () => {
        handlers.delete(callback);
        if (handlers.size === 0) listeners.delete(action);
    };
}

export function onceNuiMessage(action, callback) {
    let dispose = () => {};
    dispose = onNuiMessage(action, (data) => {
        dispose();
        callback(data);
    });
    return dispose;
}

export function dispatchNuiMessage(message) {
    if (!message || typeof message.action !== 'string') return false;

    const handlers = listeners.get(message.action);
    if (!handlers) return false;

    for (const handler of [...handlers]) handler(message.data);
    return true;
}

export function bindEscape(closeAction = 'CLOSE') {
    const handler = (event) => {
        if (event.key !== 'Escape' || !config.allowEscapeKey) return;
        void sendNuiCallback(closeAction).catch(() => {});
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
}
