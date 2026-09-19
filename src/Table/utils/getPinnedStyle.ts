import { getSize } from './utils';
import type { TableState } from '../types';

/**
 * Returns sticky offsets for a pinned column so it stays visible while scrolling.
 *
 * @example
 * ```ts
 * const style = getPinnedStyle(state, column.id);
 * ```
 */
export function getPinnedStyle(
  state: TableState,
  columnId: string,
): Record<string, string | number> {
  const side = state.columnPinning.left[columnId]
    ? 'left'
    : state.columnPinning.right[columnId]
      ? 'right'
      : false;

  if (!side) return {};

  const pinnedIds = state.visibleColumns
    .filter(column => state.columnPinning[side][column.id])
    .map(column => column.id);
  const ids = side === 'right' ? [...pinnedIds].reverse() : pinnedIds;
  let offset = 0;

  for (const id of ids) {
    if (id === columnId) {
      return {
        position: 'sticky',
        [side]: offset,
        width: state.columnPinning[side][columnId] || getSize(state, state.visibleColumns.find(column => column.id === id)!),
      };
    }

    const column = state.visibleColumns.find(item => item.id === id);
    offset += Number(state.columnPinning[side][id]) || (column ? getSize(state, column) : 0);
  }

  return {
    position: 'sticky',
    [side]: 0,
  };
}
