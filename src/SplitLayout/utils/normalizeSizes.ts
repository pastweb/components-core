/** Normalizes pane sizes to percentages totalling 100 while honouring `minSize`. */
export function normalizeSizes(input: number[], count: number, minSize: number): number[] {
  if (count <= 0) return [];
  const effectiveMin = Math.min(Math.max(minSize, 0), 100 / count);
  const values = input.length === count && input.every(value => Number.isFinite(value) && value >= 0)
    ? input
    : Array(count).fill(1);
  const total = values.reduce((sum, value) => sum + value, 0) || count;
  const normalized = values.map(value => (value / total) * 100);

  for (let pass = 0; pass < count; pass++) {
    const below = normalized.map((value, index) => value < effectiveMin ? index : -1).filter(index => index >= 0);
    if (!below.length) break;
    const deficit = below.reduce((sum, index) => sum + effectiveMin - normalized[index], 0);
    below.forEach(index => { normalized[index] = effectiveMin; });
    const flexible = normalized.map((value, index) => value > effectiveMin && !below.includes(index) ? index : -1).filter(index => index >= 0);
    const flexibleTotal = flexible.reduce((sum, index) => sum + normalized[index] - effectiveMin, 0);
    flexible.forEach(index => {
      normalized[index] -= flexibleTotal ? deficit * ((normalized[index] - effectiveMin) / flexibleTotal) : 0;
    });
  }

  return normalized;
}
