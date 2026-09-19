/**
 * Converts a boolean row-id record into an array of active ids.
 *
 * @example
 * ```ts
 * toRowIdArray({ 'row-a': true, 'row-b': false });
 * ```
 */
export function toRowIdArray(record: Record<string, boolean>): string[] {
  return Object.keys(record).filter(id => record[id]);
}
