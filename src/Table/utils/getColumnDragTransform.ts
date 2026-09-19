import { getVisualColumnIds } from './getVisualColumnIds';
import type { TableState } from '../types';

/**
 * Returns the live `translateX` preview for a column while another is dragged.
 *
 * @example
 * ```ts
 * getColumnDragTransform(column.id, state);
 * ```
 */
export function getColumnDragTransform(columnId: string, state: TableState): string | undefined {
  const fromId = state.draggingColumnId;
  const toId = state.dragOverColumnId;

  if (!fromId || !toId || fromId === toId) return;

  const order = getVisualColumnIds(state);
  const from = order.indexOf(fromId);
  const to = order.indexOf(toId);
  const index = order.indexOf(columnId);

  if (from < 0 || to < 0 || index < 0) return;

  const widthOf = (id: string) => state.columnDragRects[id]?.width ?? 0;
  const draggedWidth = widthOf(fromId);
  let shift = 0;

  if (columnId === fromId) {
    if (from < to) for (let i = from + 1; i <= to; i++) shift += widthOf(order[i]);
    else for (let i = to; i < from; i++) shift -= widthOf(order[i]);
  } else if (from < to && index > from && index <= to) shift = -draggedWidth;
  else if (from > to && index >= to && index < from) shift = draggedWidth;

  return shift ? `translateX(${shift}px)` : undefined;
}
