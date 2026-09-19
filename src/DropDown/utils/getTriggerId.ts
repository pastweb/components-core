/**
 * Builds the trigger relationship ID from the DropDown base ID.
 *
 * @example
 * ```ts
 * getTriggerId(id);
 * ```
 */
export function getTriggerId(id: string): string {
  return `trigger${id}`;
}
