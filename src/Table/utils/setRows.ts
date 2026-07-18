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
import type { Cell, Column, ColumnDef, TableDefaultProps, Row, TableState } from '../types';

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

export function setRows<TData>(props: TableDefaultProps, state: TableState): void {
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
  if (grouping.length > 0 && !manualGrouping) {
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
        subRows: leafRows.map((original, i) => ({
          id: props.getRowId(original, i),
          original,
          depth: 1,
          subRows: [],
          getValue: (cid: string) => getRowValue(original, visibleColumns.find((c) => c.id === cid)!),
          getVisibleCells: () => [],
          isSelected: () => !!rowSelection[props.getRowId(original, i)],
          isExpanded: () => false,
          canExpand: () => false,
          toggleExpanded: () => { },
          isGrouped: () => false,
        })),
        getValue: (cid: string) => (cid === groupBy ? groupValue : aggregatedValues[cid]),
        getVisibleCells: () => [],
        isSelected: () => false,
        isExpanded: () => !!expanded[rowId],
        canExpand: () => true,
        toggleExpanded: () => {
          const newExpanded = { ...expanded };
          newExpanded[rowId] = !newExpanded[rowId];
          props.onExpandedChange!(newExpanded);
        },
        isGrouped: () => true,
      } as Row<TData>;
    });

    processedData = groupedRows.flatMap((g) => (expanded[g.id] ? [g, ...g.subRows] : [g])) as TData[];
  } else {
    processedData = processedData.map((original, i) => {
      const rowId = props.getRowId(original, i);
      const subRowsData = props.getSubRows?.(original) || [];
      return {
        id: rowId,
        original,
        depth: 0,
        subRows: subRowsData.map((sub, j) => ({
          id: props.getRowId(sub, j),
          original: sub,
          depth: 1,
          subRows: [],
          getValue: (cid: string) => getRowValue(sub, columns.find((c) => c.id === cid)!),
          getVisibleCells: () => [],
          isSelected: () => !!rowSelection[props.getRowId(sub, j)],
          isExpanded: () => false,
          canExpand: () => false,
          toggleExpanded: () => { },
          isGrouped: () => false,
        })),
        getValue: (cid: string) => getRowValue(original, columns.find((c) => c.id === cid)!),
        getVisibleCells: () => [],
        isSelected: () => !!rowSelection[rowId],
        isExpanded: () => !!expanded[rowId],
        canExpand: () => !!props.enableExpanding && subRowsData.length > 0,
        toggleExpanded: () => {
          const newExpanded = { ...expanded };
          newExpanded[rowId] = !newExpanded[rowId];
          props.onExpandedChange!(newExpanded);
        },
        isGrouped: () => false,
      } as Row<TData>;
    }) as TData[];
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
  state.rows = processedData.map((rowData) => {
    const row = rowData as Row<TData>;

    row.getVisibleCells = () =>
      visibleColumns.map((colDef) => {
        const col: Column<TData> = {
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
        };

        const getValue = () => getRowValue(row.original, colDef);

        return {
          id: `${row.id}_${colDef.id}`,
          column: col,
          row,
          getValue,
        } as Cell<TData>;
      });

    return row;
  }) as Row<TData>[];
}
