/**
 * Converts an array of row ids into a boolean record.
 *
 * @example
 * ```ts
 * toRowIdRecord(['row-a', 'row-b']);
 * ```
 */
export function toRowIdRecord(ids: string[]): Record<string, boolean> {
  const record: Record<string, boolean> = {};
  for (const id of ids) {
    record[id] = true;
  }
  return record;
}
