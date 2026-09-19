/**
 * Returns whether `node` is inside `el`.
 *
 * @example
 * ```ts
 * isInside(container, event.target);
 * // true when the click landed in the container
 * ```
 */
export function isInside(
  el: HTMLElement | undefined,
  node: EventTarget | null | undefined,
): boolean {
  return !!(el && node && el.contains(node as Node));
}
