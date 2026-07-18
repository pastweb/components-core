import {
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
import type { Column, TableDefaultProps, TableState } from '../types'

export function setAllLeafColumns<TData>(props: TableDefaultProps, state: TableState): void {
  state.allLeafColumns = state.visibleColumns.map((colDef) => ({
    id: colDef.id,
    columnDef: colDef,
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
  })) as Column<TData>[];
}
