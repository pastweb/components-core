import type { ColumnDef, TableDefaultProps, TableState } from '../types';

/**
 * Sets the rendered width on every header and cell for a column, including
 * nested subrow tables.
 *
 * @example
 * ```ts
 * setColumnWidth(table, 'email', 160);
 * ```
 */
function setColumnWidth(table: HTMLTableElement, columnId: string, width: number): void {
  table.querySelectorAll(`[data-column-id="${CSS.escape(columnId)}"]`).forEach(element => {
    (element as HTMLElement).style.width = `${width}px`;
  });
}

/**
 * Starts a column resize drag so the resizer tracks the pointer.
 *
 * Uses the column's rendered width and keeps the total table width stable by
 * shrinking or growing the next column. The last column grows the table.
 * Nested subrow tables share the same column ids, so they resize with the header.
 *
 * @example
 * ```ts
 * startColumnResize(event, props, state, table, colDef);
 * ```
 */
export function startColumnResize(
  event: MouseEvent | TouchEvent,
  props: TableDefaultProps,
  state: TableState,
  table: HTMLTableElement | undefined,
  colDef: ColumnDef,
): void {
  event.stopPropagation();
  event.preventDefault();
  if (!table) return;

  const th = ((event.target || event.currentTarget) as HTMLElement | undefined)?.closest?.('th');
  if (!th) return;

  const minSize = colDef.minSize ?? 50;
  const startSize = th.getBoundingClientRect().width;
  const columnLeft = th.getBoundingClientRect().left;
  const nextTh = th.nextElementSibling as HTMLElement | null;
  const nextId = nextTh?.getAttribute('data-header-id');
  const nextColDef = nextId ? state.visibleColumns.find(column => column.id === nextId) : undefined;
  const nextMinSize = nextColDef?.minSize ?? 50;
  const nextStartSize = nextTh ? nextTh.getBoundingClientRect().width : 0;
  const maxSize = Math.min(
    colDef.maxSize ?? Number.POSITIVE_INFINITY,
    nextTh ? startSize + nextStartSize - nextMinSize : Number.POSITIVE_INFINITY,
  );

  const headers = Array.from(table.querySelectorAll('th[data-header-id]')) as HTMLElement[];
  const widths: Record<string, number> = {};
  headers.forEach(cell => {
    const id = cell.getAttribute('data-header-id');
    if (!id) return;
    widths[id] = cell.getBoundingClientRect().width;
    setColumnWidth(table, id, widths[id]);
  });

  const onMove = (moveEvent: MouseEvent | TouchEvent) => {
    if ('touches' in moveEvent && moveEvent.touches.length === 0) return;
    moveEvent.preventDefault();

    const clientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
    const newSize = Math.min(maxSize, Math.max(minSize, clientX - columnLeft));
    setColumnWidth(table, colDef.id, newSize);
    widths[colDef.id] = newSize;

    if (nextTh && nextId) {
      const siblingSize = startSize + nextStartSize - newSize;
      setColumnWidth(table, nextId, siblingSize);
      widths[nextId] = siblingSize;
      return;
    }

    table.style.width = `${Object.values(widths).reduce((sum, width) => sum + width, 0)}px`;
  };

  const onEnd = () => {
    state.columnSizing = { ...state.columnSizing, ...widths };
    if (!nextTh) {
      state.tableStyle = {
        ...state.tableStyle,
        width: `${Object.values(widths).reduce((sum, width) => sum + width, 0)}px`,
      };
    }
    props.onColumnSizingChange(state.columnSizing);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onEnd);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchend', onEnd);
  };

  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('touchend', onEnd);
}
