/** Moves percentage between adjacent panes without crossing `minSize`. */
export function resizePair(sizes: number[], index: number, delta: number, minSize: number): number[] {
  if (index < 0 || index >= sizes.length - 1) return sizes;
  const next = [...sizes];
  const effectiveMin = Math.min(Math.max(minSize, 0), (sizes[index] + sizes[index + 1]) / 2);
  const applied = Math.min(Math.max(delta, effectiveMin - sizes[index]), sizes[index + 1] - effectiveMin);
  next[index] += applied;
  next[index + 1] -= applied;
  return next;
}
