/**
 * Builds the listbox relationship ID from the Select host ID.
 *
 * @example
 * ```ts
 * getListboxId(id);
 * ```
 */
export function getListboxId(id: string): string {
  return `listbox${id}`;
}
