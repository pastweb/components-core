import { getVisualColumnIds } from './getVisualColumnIds';
import type { TableState } from '../types';

/**
 * Resolves the column slot under the pointer from positions captured at drag start.
 *
 * Uses the original header boxes so transformed columns still map both directions.
 *
 * @example
 * ```ts
 * getDragOverColumnId(event.clientX, state);
 * ```
 */
export function getDragOverColumnId(clientX: number, state: TableState): string | undefined {
  const draggingId = state.draggingColumnId;

  if (!draggingId) return;

  const order = getVisualColumnIds(state);

  for (const id of order) {
    const rect = state.columnDragRects[id];

    if (!rect) continue;
    if (clientX >= rect.left && clientX < rect.left + rect.width) return id;
  }

  const first = order[0] ? state.columnDragRects[order[0]] : undefined;
  const lastId = order[order.length - 1];
  const last = lastId ? state.columnDragRects[lastId] : undefined;

  if (first && clientX < first.left) return order[0];
  if (last && clientX >= last.left + last.width) return lastId;

  return draggingId;
}
