export function totalCents(unitCents, quantity) {
  if (!Number.isSafeInteger(unitCents) || unitCents < 0) {
    throw new RangeError('Preço deve ser inteiro não negativo em centavos');
  }
  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    throw new RangeError('Quantidade deve ser um inteiro positivo');
  }
  const total = unitCents * quantity;
  if (!Number.isSafeInteger(total)) throw new RangeError('Total fora do limite seguro');
  return total;
}
