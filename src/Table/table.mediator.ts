import { reactive, effect } from '@pastweb/tools';
import { setAllLeafColumns, setHeaderGroups, setRows, setVisibleClumns } from './utils';
import type {
  TableDefaultProps,
  TableMediator,
  TableState,
  TableInstance,
} from './types';

export function tableMediator<TData = any>(props: TableDefaultProps<TData>): TableMediator<TData> {
  const {
    sorting = [],
    tableFilter = '',
    columnFilters = {},
    rowSelection = {},
    columnVisibility = {},
    columnOrder = props.columns.map((c) => c.id),
    columnPinning = { left: {}, right: {} },
    grouping = [],
    expanded = {},
  } = props;

  let tableElement: HTMLTableElement;

  const state = reactive<TableState<TData>>({
    visibleColumns: [],
    headerGroups: [],
    allLeafColumns: [],
    rows: [],
    tableStyle: {},
    // Controlled state
    sorting,
    tableFilter,
    columnFilters,
    optionsVisible: [],
    columnSizing: {},
    rowSelection,
    columnVisibility,
    columnOrder,
    columnPinning,
    grouping,
    expanded,
    dragOverColumnId: null,
  });

  effect(
    () => setVisibleClumns(props, state),
    () => [props.columns, props.columnVisibility, state.columnOrder],
    true,
  );

  effect(
    () => setAllLeafColumns(props, state),
    () => [state.sorting, state.columnFilters, state.columnVisibility, state.grouping, state.visibleColumns],
    true,
  );

  effect(
    () => setHeaderGroups(props, state, tableElement),
    () => [state.sorting, state.columnFilters, state.columnVisibility, state.columnOrder, state.columnPinning, state.grouping],
  );

  effect(
    () => setRows(props, state),
    () => [state.visibleColumns, state.sorting, state.tableFilter, state.columnFilters, state.rowSelection, state.columnVisibility, state.columnPinning, state.grouping, state.expanded],
    true,
  );

  const table: TableInstance<TData> = {
    getState: () => ({
      sorting,
      tableFilter,
      columnFilters,
      rowSelection,
      columnVisibility,
      columnOrder,
      columnPinning,
      grouping,
      expanded,
    }),
    setTableFilter: (value: string) => props.onTableFilterChange(value),
    getHeaderGroups: () => state.headerGroups,
    getRowModel: () => ({ rows: state.rows }),
    getAllLeafColumns: () => state.allLeafColumns,
    toggleRowSelection: (rowId: string, value?: boolean) => {
      state.rowSelection = { ...state.rowSelection, [rowId]: value !== undefined ? value : !state.rowSelection[rowId] };
      props.onRowSelectionChange(state.rowSelection);
    },
  };

  const onMounted = (target: HTMLTableElement) => {
    tableElement = target;
    setHeaderGroups(props, state, tableElement);
  };

  return { state, table: table, onMounted };
}
