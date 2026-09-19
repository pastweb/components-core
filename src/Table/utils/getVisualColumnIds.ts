import type { TableState } from '../types';

/**
 * Returns visible column ids in on-screen order: left-pinned, unpinned, right-pinned.
 *
 * @example
 * ```ts
 * getVisualColumnIds(state);
 * ```
 */
export function getVisualColumnIds(state: TableState): string[] {
  const left: string[] = [];
  const center: string[] = [];
  const right: string[] = [];

  for (const column of state.visibleColumns) {
    if (state.columnPinning.left[column.id]) left.push(column.id);
    else if (state.columnPinning.right[column.id]) right.push(column.id);
    else center.push(column.id);
  }

  return [...left, ...center, ...right];
}
