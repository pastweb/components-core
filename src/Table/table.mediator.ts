import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import { createGetRowId, getContext, setAllLeafColumns, setHeaderGroups, setRows, setVisibleClumns, toRowIdArray, toRowIdRecord } from './utils';
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
    selectedRows,
    columnVisibility = {},
    columnOrder = props.columns.map((c) => c.id),
    expandedRows,
  } = props;

  const rowIds = createGetRowId(props.getRowId);
  const id = idCache.getId('table');
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
    rowSelection: selectedRows ? toRowIdRecord(selectedRows) : {},
    columnVisibility,
    columnOrder,
    columnPinning: { left: {}, right: {} },
    grouping: [],
    expanded: toRowIdRecord(expandedRows ?? []),
    dragOverColumnId: null,
    draggingColumnId: null,
    columnDragRects: {},
  });

  effect(
    () => setVisibleClumns(props, state),
    () => [props.columns, props.columnVisibility, state.columnOrder],
    true,
  );

  effect(
    () => setAllLeafColumns(props, state),
    () => [state.sorting, state.columnVisibility, state.grouping, state.visibleColumns],
    true,
  );

  effect(
    () => {
      if (props.selectedRows !== undefined) {
        state.rowSelection = toRowIdRecord(props.selectedRows);
      }
    },
    () => [props.selectedRows],
    true,
  );

  effect(
    () => {
      if (props.expandedRows !== undefined) {
        state.expanded = toRowIdRecord(props.expandedRows);
      }
    },
    () => [props.expandedRows],
    true,
  );

  effect(
    () => setHeaderGroups(props, state, tableElement),
    () => [props.columns, props.grouping, state.sorting, state.columnVisibility, state.columnOrder, state.columnPinning, state.grouping],
  );

  effect(
    () => {
      setRows(props, state, rowIds.getRowId);
      rowIds.prune(props.data);
    },
    () => [props.data, props.expanding, props.grouping, state.visibleColumns, state.sorting, state.tableFilter, state.columnFilters, state.rowSelection, state.columnVisibility, state.columnPinning, state.grouping, state.expanded],
    true,
  );

  const table: TableInstance<TData> = {
    getState: () => ({
      sorting: state.sorting,
      tableFilter: state.tableFilter,
      columnFilters: state.columnFilters,
      rowSelection: state.rowSelection,
      columnVisibility: state.columnVisibility,
      columnOrder: state.columnOrder,
      columnPinning: state.columnPinning,
      grouping: state.grouping,
      expandedRows: toRowIdArray(state.expanded),
    }),
    setTableFilter: (value: string) => {
      state.tableFilter = value;
      props.onTableFilterChange(value);
    },
    getHeaderGroups: () => state.headerGroups,
    getRowModel: () => ({ rows: state.rows }),
    getAllLeafColumns: () => state.allLeafColumns,
    toggleRowSelection: (rowId: string, value?: boolean) => {
      state.rowSelection = { ...state.rowSelection, [rowId]: value !== undefined ? value : !state.rowSelection[rowId] };
      props.onRowSelectionChange(state.rowSelection);
      props.onSelectedRowsChange(toRowIdArray(state.rowSelection));
    },
  };

  const onMounted = (target: HTMLTableElement) => {
    tableElement = target;
    setHeaderGroups(props, state, tableElement);
  };

  return {
    id,
    state,
    table,
    getContext: () => getContext(props, state, table),
    onMounted,
    useBeforeUnmount: () => {
      rowIds.clear();
      idCache.removeId(id);
    },
  };
}
