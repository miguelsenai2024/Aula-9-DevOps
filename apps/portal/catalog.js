import { totalCents } from '../api/price.js';
import { formatBRL } from '../../libs/ui/format.js';

export function quote(part, quantity) {
  return { sku: part.sku, quantity, total: formatBRL(totalCents(part.unitCents, quantity)) };
}
