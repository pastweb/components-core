/**
 * Builds the content relationship ID from the DropDown base ID.
 *
 * @example
 * ```ts
 * getContentId(id);
 * ```
 */
export function getContentId(id: string): string {
  return `content${id}`;
}
