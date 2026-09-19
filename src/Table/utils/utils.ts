import { TableDefaultProps, TableState, ColumnDef } from '../types';

export function canSort(props: TableDefaultProps, colDef: ColumnDef): boolean {
  return !!props.columnSorting || !!colDef.sorting;
}

export function isSorted(state: TableState, colDef: ColumnDef): 'asc' | 'desc' | false {
  const s = state.sorting.find((s) => s.id === colDef.id);
  return !s ? false : s.desc ? 'desc' : 'asc';
}

export function isVisible(state: TableState, colDef: ColumnDef): boolean {
  return state.columnVisibility[colDef.id] !== false;
}

export function toggleSorting(
  props: TableDefaultProps,
  state: TableState,
  colDef: ColumnDef,
  direction?: 'asc' | 'desc' | false,
): void {
  const { sorting } = state;
  if (!colDef.sorting) return;
  const others = sorting.filter(item => item.id !== colDef.id);
  let newSorting = others;
  if (direction === false) {
    newSorting = others;
  } else if (direction === 'asc') {
    newSorting = [{ id: colDef.id, desc: false }, ...others];
  } else if (direction === 'desc') {
    newSorting = [{ id: colDef.id, desc: true }, ...others];
  } else if (isSorted(state, colDef) === 'asc') {
    newSorting = others;
  } else if (sorting.find(item => item.id === colDef.id)?.desc) {
    newSorting = [{ id: colDef.id, desc: false }, ...others];
  } else {
    newSorting = [{ id: colDef.id, desc: true }, ...others];
  }
  state.sorting = newSorting;
  props.onSortingChange!(newSorting);
}

export function canResize(props: TableDefaultProps, colDef: ColumnDef): boolean {
  return !!props.columnResizing || !!colDef.resizing;
}

export function canPin(props: TableDefaultProps, colDef: ColumnDef): boolean {
  return !!props.columnPinning || !!colDef.pinning;
}

export function isPinned(state: TableState, colDef: ColumnDef): 'left' | 'right' | false {
  const { columnPinning } = state;
  if (columnPinning.left[colDef.id]) return 'left';
  if (columnPinning.right[colDef.id]) return 'right';

  return false;
}

export function togglePinning(e: MouseEvent, props: TableDefaultProps, state: TableState, colDef: ColumnDef): void {
  const target = (e?.target || e?.currentTarget) as HTMLElement | undefined;
  const fromEvent = typeof target?.closest === 'function' ? target.closest('th') : null;
  const fromDom = typeof document !== 'undefined'
    ? document.querySelector(`[data-header-id="${colDef.id}"]`)
    : null;
  const headerCell = (fromEvent || fromDom) as HTMLElement | null;
  const currentSize = headerCell
    ? parseFloat(getComputedStyle(headerCell).width)
    : getSize(state, colDef);
  const current = isPinned(state, colDef);

  const pinning = {
    left: { ...state.columnPinning.left },
    right: { ...state.columnPinning.right },
  };

  if (current === 'left') {
    delete pinning.left[colDef.id];
    pinning.right[colDef.id] = currentSize;
  } else if (current === 'right') {
    delete pinning.right[colDef.id];
  } else {
    pinning.left[colDef.id] = currentSize;
  }

  state.columnPinning = pinning;
  state.columnSizing = { ...state.columnSizing, [colDef.id]: currentSize };

  props.onColumnPinningChange!(pinning);
}

export function toggleVisibility(props: TableDefaultProps, state: TableState, colDef: ColumnDef): void {
  const newVis = { ...state.columnVisibility, [colDef.id]: !state.columnVisibility[colDef.id] };
  state.columnVisibility = newVis;
  props.onColumnVisibilityChange!(newVis);
}

export function canFilter(colDef: ColumnDef): boolean { return !!colDef.columnFilter; }

export function canGroup(props: TableDefaultProps, colDef: ColumnDef): boolean {
  return !!props.grouping && !!colDef.grouping;
}

export function getFilterValue(state: TableState, colDef: ColumnDef): string {
  return state.columnFilters[colDef.id] || '';
}

export function isOptionsVisible(state: TableState, colDef: ColumnDef): boolean {
  return state.optionsVisible.includes(colDef.id);
}

export function toggleOptionsVisible(props: TableDefaultProps, state: TableState, colDef: ColumnDef): void {
  const { optionsVisible } = state;
  const exists = optionsVisible.includes(colDef.id);
  const newOptionsVisibility = [...exists ? optionsVisible.filter(id => id !== colDef.id) : [...optionsVisible, colDef.id]];
  state.optionsVisible = newOptionsVisibility;
  props.onColumnFilterVisiblityChange(newOptionsVisibility)
}

export function setFilterValue(value: any, props: TableDefaultProps, state: TableState, colDef: ColumnDef): void {
  const newFilters = { ...state.columnFilters, [colDef.id]: value || undefined };
  state.columnFilters = newFilters;
  props.onColumnFiltersChange!(newFilters);
}

export function getSize(state: TableState, colDef: ColumnDef): number {
  return state.columnSizing[colDef.id] ?? colDef.size ?? 150;
}

export function isGrouped(state: TableState, colDef: ColumnDef): boolean {
  return state.grouping.includes(colDef.id);
}
