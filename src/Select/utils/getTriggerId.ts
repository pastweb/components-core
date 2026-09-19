/**
 * Builds the trigger relationship ID from the Select host ID.
 *
 * @example
 * ```ts
 * getTriggerId(id);
 * ```
 */
export function getTriggerId(id: string): string {
  return `trigger${id}`;
}
