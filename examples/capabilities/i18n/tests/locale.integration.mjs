import assert from 'node:assert/strict';
import { createLocaleState, validateLocaleParity } from '../ui/locale.js';

const locales = {
  en: {
    'shop.purchase': 'Purchased {quantity} x {item}.',
    'shop.long': 'Confirm the selected item before completing this purchase.',
  },
  th: {
    'shop.purchase': 'ซื้อ {quantity} x {item} เรียบร้อยแล้ว',
    'shop.long': 'กรุณาตรวจสอบรายการสินค้า จำนวน และราคารวมให้เรียบร้อยก่อนยืนยันการสั่งซื้อครั้งนี้',
  },
};

assert.deepEqual(validateLocaleParity(locales, 'en'), []);
assert.match(locales.th['shop.long'], /[ก-๙]/u, 'Thai long-text fixture should contain Thai characters');
assert.ok(locales.th['shop.long'].length > locales.en['shop.long'].length, 'Thai fixture should exercise expansion');

const missing = [];
const state = createLocaleState({ locales, fallback: 'en', initial: 'th', onMissing: (locale, key) => missing.push(`${locale}:${key}`) });
assert.equal(state.translate('shop.purchase', { quantity: 2, item: 'water' }), 'ซื้อ 2 x water เรียบร้อยแล้ว');
assert.equal(state.translate('unknown.key'), 'unknown.key');
assert.equal(state.translate('unknown.key'), 'unknown.key');
assert.deepEqual(missing, ['th:unknown.key'], 'missing keys should report once');

const invalid = structuredClone(locales);
invalid.th['shop.purchase'] = 'ซื้อ {item} เรียบร้อยแล้ว';
assert.match(validateLocaleParity(invalid, 'en')[0], /placeholders differ/);

console.log('[i18n-test] fallback, diagnostics, parity, placeholders, and Thai expansion passed.');
