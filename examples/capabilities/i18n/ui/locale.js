/** @typedef {Record<string, string>} Messages */
/** @typedef {Record<string, Messages>} Locales */

function placeholders(message) {
  return [...message.matchAll(/\{([A-Za-z0-9_]+)\}/g)].map((match) => match[1]).sort();
}

/**
 * @param {Locales} locales
 * @param {string} fallback
 * @returns {string[]}
 */
export function validateLocaleParity(locales, fallback) {
  const errors = [];
  const fallbackMessages = locales[fallback];
  if (!fallbackMessages) return [`Missing fallback locale: ${fallback}`];

  for (const [locale, messages] of Object.entries(locales)) {
    for (const [key, fallbackMessage] of Object.entries(fallbackMessages)) {
      if (!(key in messages)) {
        errors.push(`${locale} is missing key ${key}`);
        continue;
      }
      const expected = placeholders(fallbackMessage).join(',');
      const actual = placeholders(messages[key]).join(',');
      if (actual !== expected) errors.push(`${locale}.${key} placeholders differ: expected [${expected}], received [${actual}]`);
    }
  }

  return errors;
}

/**
 * @param {{ locales: Locales, fallback: string, initial?: string, onMissing?: (locale: string, key: string) => void }} options
 */
export function createLocaleState(options) {
  const { locales, fallback, onMissing = () => {} } = options;
  const parityErrors = validateLocaleParity(locales, fallback);
  if (parityErrors.length > 0) throw new Error(`Locale parity validation failed:\n${parityErrors.join('\n')}`);

  let current = options.initial && locales[options.initial] ? options.initial : fallback;
  const missing = new Set();

  function recordMissing(locale, key) {
    const diagnostic = `${locale}:${key}`;
    if (missing.has(diagnostic)) return;
    missing.add(diagnostic);
    onMissing(locale, key);
  }

  return Object.freeze({
    get locale() {
      return current;
    },
    setLocale(locale) {
      if (!locales[locale]) return false;
      current = locale;
      return true;
    },
    translate(key, values = {}) {
      let message = locales[current]?.[key];
      if (!message) {
        recordMissing(current, key);
        message = locales[fallback]?.[key];
      }
      if (!message) return key;
      return message.replace(/\{([A-Za-z0-9_]+)\}/g, (placeholder, name) => (
        Object.hasOwn(values, name) ? String(values[name]) : placeholder
      ));
    },
    diagnostics() {
      return Object.freeze({ locale: current, fallback, missingKeys: [...missing].sort() });
    },
  });
}
