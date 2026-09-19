/**
 * Builds the visible-label relationship ID from the Select host ID.
 *
 * @example
 * ```ts
 * getLabelId(id);
 * ```
 */
export function getLabelId(id: string): string {
  return `label${id}`;
}
