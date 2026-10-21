import test from 'node:test';
import assert from 'node:assert/strict';
import { quote } from '../apps/portal/catalog.js';

test('portal integra preço e formatação da biblioteca compartilhada', () => {
  const result = quote({ sku: 'FILTRO-01', unitCents: 1999 }, 3);
  assert.equal(result.sku, 'FILTRO-01');
  assert.equal(result.quantity, 3);
  assert.match(result.total.replace(/\s/g, ''), /^R\$59,97$/);
});
