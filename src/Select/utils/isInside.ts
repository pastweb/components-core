/**
 * Returns whether `node` is inside `el`.
 *
 * @example
 * ```ts
 * isInside(listbox, event.target);
 * ```
 */
export function isInside(
  el: HTMLElement | undefined,
  node: EventTarget | null | undefined,
): boolean {
  return !!(el && node && el.contains(node as Node));
}
