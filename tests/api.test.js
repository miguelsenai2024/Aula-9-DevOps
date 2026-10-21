import test from 'node:test';
import assert from 'node:assert/strict';
import { totalCents } from '../apps/api/price.js';

test('calcula total em centavos', () => {
  assert.equal(totalCents(1999, 3), 5997);
  assert.equal(totalCents(0, 1), 0);
});
test('recusa entradas inválidas e overflow', () => {
  for (const args of [[-1, 1], [10, 0], [10, 1.5], [1.5, 2], [Number.MAX_SAFE_INTEGER, 2]]) {
    assert.throws(() => totalCents(...args), RangeError);
  }
});
