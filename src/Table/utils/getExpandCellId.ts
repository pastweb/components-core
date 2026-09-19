/**
 * Returns whether a column is a Table feature field (id or accessor starts with `_`).
 *
 * @example
 * ```ts
 * isFeatureColumn({ id: '_select', columnDef: { accessorKey: '_select' } }); // true
 * isFeatureColumn({ id: 'name', columnDef: { accessorKey: 'name' } }); // false
 * ```
 */
export function isFeatureColumn(column: {
  id: string;
  columnDef?: { accessorKey?: string | number | symbol };
}): boolean {
  const key = String(column.columnDef?.accessorKey ?? column.id);
  return column.id.startsWith('_') || key.startsWith('_');
}

/**
 * Returns the cell id of the first visible column that is not a feature field.
 *
 * Expanding controls are rendered in that cell.
 *
 * @example
 * ```ts
 * getExpandCellId(row.getVisibleCells());
 * ```
 */
export function getExpandCellId(cells: Array<{
  id: string;
  column: { id: string; columnDef?: { accessorKey?: string | number | symbol } };
}>): string | undefined {
  return cells.find(cell => !isFeatureColumn(cell.column))?.id;
}
