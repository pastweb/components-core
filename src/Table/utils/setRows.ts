import { getSubRows } from './getSubRows';
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
import { toRowIdArray } from './toRowIdArray';
import type { Cell, Column, ColumnDef, GetRowId, TableDefaultProps, Row, TableState } from '../types';

function getRowValue<TData>(row: TData, column: ColumnDef<TData>): any {
  if (column.accessorFn) return column.accessorFn(row);
  if (column.accessorKey) return (row as any)[column.accessorKey];
  return undefined;
}

function simpleAggregate(aggregationFn: ColumnDef<any>['aggregationFn'], leafValues: any[]): any {
  if (!aggregationFn) return leafValues[0];
  if (aggregationFn === 'sum') return leafValues.reduce((a, b) => (a || 0) + (b || 0), 0);
  if (aggregationFn === 'min') return Math.min(...leafValues.filter(v => v != null));
  if (aggregationFn === 'max') return Math.max(...leafValues.filter(v => v != null));
  if (aggregationFn === 'count') return leafValues.length;
  if (typeof aggregationFn === 'function') return aggregationFn(leafValues);
  return leafValues[0];
}

function toggleRowExpanded(props: TableDefaultProps, state: TableState, rowId: string): void {
  const nextExpanded = { ...state.expanded, [rowId]: !state.expanded[rowId] };
  state.expanded = nextExpanded;
  props.onExpandedRowsChange(toRowIdArray(nextExpanded));
}

function getVisibleCellsForRow<TData>(row: Row<TData>, props: TableDefaultProps, state: TableState): Cell<TData>[] {
  return state.visibleColumns.map((colDef) => {
    const col: Column<TData> = {
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
    };

    return {
      id: `${row.id}_${colDef.id}`,
      column: col,
      row,
      getValue: () => getRowValue(row.original, colDef),
    } as Cell<TData>;
  });
}

export function setRows<TData>(props: TableDefaultProps, state: TableState, getRowId: GetRowId<TData>): void {
  const { data, columns, manualSorting, manualFiltering, manualGrouping } = props;

  const {
    visibleColumns,
    sorting,
    tableFilter,
    columnFilters,
    rowSelection,
    columnVisibility,
    columnPinning,
    grouping,
    expanded,
  } = state;

  let processedData = [...data];

  // Table + column filters
  if (!manualFiltering) {
    if (tableFilter) {
      const term = tableFilter.toLowerCase();
      processedData = processedData.filter((row) =>
        Object.values(row as any).some((val) => String(val).toLowerCase().includes(term))
      );
    }
    Object.entries(columnFilters).forEach(([colId, filterVal]) => {
      if (!filterVal) return;
      const colDef = columns.find((c) => c.id === colId);
      if (!colDef) return;
      processedData = processedData.filter((row) => {
        const val = getRowValue(row, colDef);
        return String(val).toLowerCase().includes(String(filterVal).toLowerCase());
      });
    });
  }

  // Grouping
  if (props.grouping && grouping.length > 0 && !manualGrouping) {
    const groupBy = grouping[0];
    const groupMap = new Map<any, TData[]>();
    processedData.forEach((row) => {
      const key = getRowValue(row, columns.find((c) => c.id === groupBy)!);
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key)!.push(row);
    });

    const groupedRows: Row<TData>[] = Array.from(groupMap.entries()).map(([groupValue, leafRows], idx) => {
      const rowId = `group_${groupBy}_${idx}`;
      const aggregatedValues: Record<string, any> = {};
      visibleColumns.forEach((col) => {
        if (col.aggregationFn) {
          const leafVals = leafRows.map((r) => getRowValue(r, col));
          aggregatedValues[col.id] = simpleAggregate(col.aggregationFn, leafVals);
        }
      });

      const groupRow: any = { [groupBy]: groupValue, ...aggregatedValues };
      return {
        id: rowId,
        original: groupRow,
        depth: 0,
        subRows: leafRows.map((original, i) => {
          const leafId = getRowId(original, i);
          return {
            id: leafId,
            original,
            depth: 1,
            subRows: [],
            getValue: (cid: string) => getRowValue(original, visibleColumns.find((c) => c.id === cid)!),
            getVisibleCells: () => [],
            isSelected: () => !!rowSelection[leafId],
            isExpanded: () => false,
            canExpand: () => false,
            toggleExpanded: () => { },
            isGrouped: () => false,
          };
        }),
        getValue: (cid: string) => (cid === groupBy ? groupValue : aggregatedValues[cid]),
        getVisibleCells: () => [],
        isSelected: () => false,
        isExpanded: () => !!state.expanded[rowId],
        canExpand: () => true,
        toggleExpanded: () => toggleRowExpanded(props, state, rowId),
        isGrouped: () => true,
      } as Row<TData>;
    });

    processedData = groupedRows.flatMap((g) => (expanded[g.id] ? [g, ...g.subRows] : [g])) as TData[];
  } else {
    function createExpandableRow(original: TData, index: number, depth: number): Row<TData> {
      const rowId = getRowId(original, index);
      const subRowsData = props.expanding ? getSubRows(original) : [];
      return {
        id: rowId,
        original,
        depth,
        subRows: subRowsData.map((sub, j) => createExpandableRow(sub, j, depth + 1)),
        getValue: (cid: string) => getRowValue(original, columns.find((c) => c.id === cid)!),
        getVisibleCells: () => [],
        isSelected: () => !!rowSelection[rowId],
        isExpanded: () => !!state.expanded[rowId],
        canExpand: () => !!props.expanding && subRowsData.length > 0,
        toggleExpanded: () => toggleRowExpanded(props, state, rowId),
        isGrouped: () => false,
      } as Row<TData>;
    }

    processedData = processedData.map((original, i) => createExpandableRow(original, i, 0)) as TData[];
  }

  // Sorting
  if (!manualSorting && sorting.length > 0) {
    processedData.sort((a, b) => {
      for (const sort of sorting) {
        const col = columns.find((c) => c.id === sort.id);
        if (!col) continue;
        const aData = (a as any).original ?? a;
        const bData = (b as any).original ?? b;
        const aVal = getRowValue(aData, col);
        const bVal = getRowValue(bData, col);
        if (aVal === bVal) continue;
        const cmp = aVal > bVal ? 1 : -1;
        return sort.desc ? -cmp : cmp;
      }
      return 0;
    });
  }

  // Build final rows
  function attachVisibleCells(row: Row<TData>): void {
    row.getVisibleCells = () => getVisibleCellsForRow(row, props, state);
    row.subRows.forEach(attachVisibleCells);
  }

  state.rows = processedData.map((rowData) => {
    const row = rowData as Row<TData>;
    attachVisibleCells(row);
    return row;
  }) as Row<TData>[];
}
