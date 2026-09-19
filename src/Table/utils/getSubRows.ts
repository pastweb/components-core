/**
 * Returns whether a data row has a `_children` array.
 *
 * Table feature properties on row records use a leading underscore.
 *
 * @example
 * ```ts
 * isExpandableRow({ name: 'Ada', _children: [{ name: 'Grace' }] });
 * ```
 */
export function isExpandableRow<TData>(row: TData): boolean {
  return !!row && typeof row === 'object' && Array.isArray((row as { _children?: unknown })._children);
}

/**
 * Returns nested child records for a row when expanding is enabled.
 *
 * Expandable rows store nested records on `_children`.
 *
 * @example
 * ```ts
 * getSubRows({ name: 'Ada', _children: [{ name: 'Grace' }] });
 * ```
 */
export function getSubRows<TData>(row: TData): TData[] {
  return isExpandableRow(row) ? (row as { _children: TData[] })._children : [];
}
