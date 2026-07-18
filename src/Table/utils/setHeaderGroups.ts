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
          toggleSorting: () => toggleSorting(props, state, colDef),
          canResize: () => canResize(props, colDef),
          canPin: () => canPin(props, colDef),
          isPinned: () => isPinned(state, colDef),
          togglePinning: (e: MouseEvent) => togglePinning(e, props, state, colDef),
          isVisible: () => isVisible(state, colDef),
          toggleVisibility: () => toggleVisibility(props, state, colDef),
          canFilter: () => canFilter(colDef),
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
          onResize: (e: MouseEvent | TouchEvent) => {
            e.stopPropagation();

            const target = (e.target || e.currentTarget) as HTMLElement;
            const headerCell = (target.parentElement as HTMLElement).parentElement as HTMLElement;
            const currentSize = parseFloat(getComputedStyle(headerCell).width);
            const startX = 'touches' in e ? e.touches[0].pageX : e.pageX;
            const startSize = state.columnSizing[colDef.id] ?? colDef.size ?? currentSize;
            const minSize = colDef.minSize ?? 50;
            let newSize = startSize;
            let nextCell: HTMLElement | null = null;
            let nextId: string | null = null;
            let nextSize: number | null = null;

            const columns = table.querySelectorAll('th');
            for (let i = 0; i < columns.length; i++) {
              // const col = columns[i] as HTMLElement;
              const colId = columns[i].getAttribute('data-header-id');

              if (colId === colDef.id && columns[i + 1]) {
                nextCell = columns[i + 1] as HTMLElement;
                nextId = nextCell.getAttribute('data-header-id')!;
                nextSize = parseFloat(getComputedStyle(nextCell).width);
                break;
              }
            }

            const onMove = (moveEv: MouseEvent | TouchEvent) => {
              const currentX = 'touches' in moveEv ? moveEv.touches[0].pageX : moveEv.pageX;
              const delta = currentX - startX;
              newSize = startSize + delta;
              if (newSize < minSize) newSize = minSize;
              headerCell.style.width = `${newSize}px`;

              if (nextId && nextCell) {
                nextSize = newSize - delta;
                nextCell.style.width = `${nextSize}px`;
              }
            };

            const onEnd = () => {
              state.columnSizing[colDef.id] = newSize;   // update internal state
              if (nextId && nextSize) state.columnSizing[nextId] = nextSize;   // update internal state
              props.onColumnSizingChange(state.columnSizing); // trigger callback with new sizes
              window.removeEventListener('mousemove', onMove as any);
              window.removeEventListener('mouseup', onEnd);
              window.removeEventListener('touchmove', onMove as any);
              window.removeEventListener('touchend', onEnd);
            };

            window.addEventListener('mousemove', onMove as any);
            window.addEventListener('mouseup', onEnd);
            window.addEventListener('touchmove', onMove as any);
            window.addEventListener('touchend', onEnd);
          },

          onDragStart: (e: DragEvent) => {
            e.dataTransfer!.setData('text/plain', colDef.id);
            e.dataTransfer!.effectAllowed = 'move';
          },

          onDragOver: (e: DragEvent) => {
            e.preventDefault();
            state.dragOverColumnId = colDef.id;
            e.dataTransfer!.dropEffect = 'move';
          },

          onDrop: (e: DragEvent) => {
            e.preventDefault();
            const fromId = e.dataTransfer!.getData('text/plain');
            state.dragOverColumnId = null;
            if (fromId === colDef.id) return;
            const newOrder = [...state.columnOrder];
            const fromIndex = newOrder.indexOf(fromId);
            const toIndex = newOrder.indexOf(colDef.id);
            if (fromIndex < 0 || toIndex < 0) return;
            newOrder.splice(fromIndex, 1);
            newOrder.splice(toIndex, 0, fromId);
            state.columnOrder = newOrder; // update internal state
            props.onColumnOrderChange!(newOrder);
          },

          getContext: () => ({ column: col }),
        };
      }),
    },
  ];
}
