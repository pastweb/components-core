import type {
  TableContext,
  TableDefaultProps,
  TableInstance,
  TableState,
} from '../types';

/**
 * Creates the live context exposed by a Table mediator.
 *
 * Slot content and custom header or cell renderers read this object through
 * `useTableContext`.
 *
 * @example
 * ```ts
 * getContext(props, state, table);
 * ```
 */
export function getContext<TData>(
  props: TableDefaultProps<TData>,
  state: TableState<TData>,
  table: TableInstance<TData>,
): TableContext<TData> {
  return {
    get cls() {
      return props.cls;
    },
    get state() {
      return state;
    },
    get table() {
      return table;
    },
    getState: () => table.getState(),
    setTableFilter: value => table.setTableFilter(value),
    getHeaderGroups: () => table.getHeaderGroups(),
    getRowModel: () => table.getRowModel(),
    getAllLeafColumns: () => table.getAllLeafColumns(),
    toggleRowSelection: (rowId, value) => table.toggleRowSelection(rowId, value),
  };
}
