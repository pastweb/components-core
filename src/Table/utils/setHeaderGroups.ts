import { getDragOverColumnId } from './getDragOverColumnId';
import { setColumnDragImage } from './setColumnDragImage';
import { startColumnResize } from './startColumnResize';
import {
  canSort,
  isSorted,
  isVisible,
  toggleSorting,
  canResize,
  canPin,
  isPinned,
  togglePinning,
  toggleVisibility,
  canFilter,
  canGroup,
  getFilterValue,
  isOptionsVisible,
  toggleOptionsVisible,
  setFilterValue,
  getSize,
  isGrouped,
} from './utils';
import type { Column, TableDefaultProps, TableState } from '../types';

export function setHeaderGroups<TData>(props: TableDefaultProps, state: TableState, table: HTMLTableElement): void {
  state.headerGroups = [
    {
      id: 'header',
      headers: state.visibleColumns.map((colDef) => {
        const col = {
          id: colDef.id,
          columnDef: colDef,
          canSort: () => canSort(props, colDef),
          isSorted: () => isSorted(state, colDef),
          toggleSorting: direction => toggleSorting(props, state, colDef, direction),
          canResize: () => canResize(props, colDef),
          canPin: () => canPin(props, colDef),
          isPinned: () => isPinned(state, colDef),
          togglePinning: (e: MouseEvent) => togglePinning(e, props, state, colDef),
          isVisible: () => isVisible(state, colDef),
          toggleVisibility: () => toggleVisibility(props, state, colDef),
          canFilter: () => canFilter(colDef),
          canGroup: () => canGroup(props, colDef),
          getFilterValue: () => getFilterValue(state, colDef),
          isOptionsVisible: () => isOptionsVisible(state, colDef),
          toggleOptionsVisible: () => toggleOptionsVisible(props, state, colDef),
          setFilterValue: (value: any) => setFilterValue(value, props, state, colDef),
          getSize: () => getSize(state, colDef),
          isGrouped: () => isGrouped(state, colDef),
        } as Column<TData>;

        return {
          id: colDef.id,
          colSpan: 1,
          isPlaceholder: false,
          column: col,
          onResize: (e: MouseEvent | TouchEvent) => startColumnResize(e, props, state, table, colDef),

          onDragStart: (e: DragEvent) => {
            e.dataTransfer!.setData('text/plain', colDef.id);
            e.dataTransfer!.effectAllowed = 'move';
            const rects: Record<string, { left: number; width: number }> = {};
            table?.querySelectorAll('th[data-header-id]').forEach(header => {
              const id = header.getAttribute('data-header-id');
              if (!id) return;
              const rect = header.getBoundingClientRect();
              rects[id] = { left: rect.left, width: rect.width };
            });
            state.columnDragRects = rects;
            state.draggingColumnId = colDef.id;
            state.dragOverColumnId = colDef.id;
            setColumnDragImage(e);
          },

          onDragOver: (e: DragEvent) => {
            e.preventDefault();
            e.dataTransfer!.dropEffect = 'move';
            const targetId = getDragOverColumnId(e.clientX, state);
            if (targetId && state.dragOverColumnId !== targetId) state.dragOverColumnId = targetId;
          },

          onDragEnd: () => {
            state.draggingColumnId = null;
            state.dragOverColumnId = null;
            state.columnDragRects = {};
          },

          onDrop: (e: DragEvent) => {
            e.preventDefault();
            const fromId = state.draggingColumnId;
            const toId = state.dragOverColumnId;
            if (fromId && toId && fromId !== toId) {
              const newOrder = [...state.columnOrder];
              const fromIndex = newOrder.indexOf(fromId);
              const toIndex = newOrder.indexOf(toId);
              if (fromIndex >= 0 && toIndex >= 0) {
                newOrder.splice(fromIndex, 1);
                newOrder.splice(toIndex, 0, fromId);
                state.columnOrder = newOrder;
                props.onColumnOrderChange!(newOrder);
              }
            }
            state.draggingColumnId = null;
            state.dragOverColumnId = null;
            state.columnDragRects = {};
          },

          getContext: () => ({ column: col }),
        };
      }),
    },
  ];
}
