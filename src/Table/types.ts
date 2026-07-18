import type { ClassValue } from '@pastweb/tools';

export type Component = any;

export interface ColumnDef<TData = any> {
  id: string;
  accessorKey?: keyof TData;
  accessorFn?: (row: TData) => any;
  header: string | Component | ((props: { column: Column<TData> }) => Component);
  cell?: (props: { row: Row<TData>; getValue: () => any }) => Component;
  aggregatedCell?: (props: { row: Row<TData>; getValue: () => any }) => Component;
  footer?: string | Component | ((props: { column: Column<TData> }) => Component);
  sorting?: boolean;
  resizing?: boolean;
  pinning?: boolean;
  columnFilter?: boolean;
  grouping?: boolean;
  aggregationFn?: 'sum' | 'min' | 'max' | 'count' | ((leafValues: any[]) => any);
  size?: number;
  minSize?: number;
  maxSize?: number;
  meta?: any;
};

export interface Column<TData = any> {
  id: string;
  columnDef: ColumnDef<TData>;
  canSort: () => boolean;
  isSorted: () => false | 'asc' | 'desc';
  toggleSorting: () => void;
  canResize: () => boolean;
  canPin: () => boolean;
  isPinned: () => 'left' | 'right' | false;
  togglePinning: (e: any) => void;
  isVisible: () => boolean;
  toggleVisibility: () => void;
  canFilter: () => boolean;

  getFilterValue: () => any;
  isOptionsVisible: () => boolean;
  toggleOptionsVisible: () => void;
  setFilterValue: (value: any) => void;
  getSize: () => number;
  isGrouped: () => boolean;
};

export interface Row<TData = any> {
  id: string;
  original: TData;
  depth: number;
  subRows: Row<TData>[];
  getValue: (columnId: string) => any;
  getVisibleCells: () => Cell<TData>[];
  isSelected: () => boolean;
  isExpanded: () => boolean;
  canExpand: () => boolean;
  toggleExpanded: () => void;
  isGrouped: () => boolean; // for grouping rows
};

export interface Cell<TData = any> {
  id: string;
  column: Column<TData>;
  row: Row<TData>;
  getValue: () => any;
};

export interface HeaderGroup<TData = any> {
  id: string;
  headers: Header<TData>[];
};

export interface Header<TData = any> {
  id: string;
  colSpan: number;
  isPlaceholder: boolean;
  column: Column<TData>;
  onResize: (e: any) => void;
  onDragStart: (e: any) => void;
  onDragOver: (e: any) => void;
  onDrop: (e: any) => void;
  getContext: () => any;
};

export interface TableInstance<TData = any> {
  getState: () => {
    sorting: SortingState;
    tableFilter?: string;
    columnFilters: ColumnFiltersState;
    rowSelection: RowSelectionState;
    columnVisibility: VisibilityState;
    columnOrder: ColumnOrderState;
    columnPinning: ColumnPinningState;
    grouping: GroupingState;
    expanded: ExpandedState;
  };
  setTableFilter: (value: string) => void;
  getHeaderGroups: () => HeaderGroup<TData>[];
  getRowModel: () => { rows: Row<TData>[] };
  getAllLeafColumns: () => Column<TData>[];
  toggleRowSelection: (rowId: string, value?: boolean) => void;
};

export type SortingState = Array<{ id: string; desc: boolean }>;
export type ColumnFiltersState = Record<string, any>;
export type RowSelectionState = Record<string, boolean>;
export type VisibilityState = Record<string, boolean>;
export type ColumnOrderState = string[];
export type ColumnPinningState = { left: Record<string, number>; right: Record<string, number> };
export type GroupingState = string[];
export type ExpandedState = Record<string, boolean>;

export interface TableProps<TData = any> {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  data: TData[];
  columns: ColumnDef<TData>[];
  enableRowSelection?: boolean;
  enableExpanding?: boolean;
  enableColumnResizing?: boolean;
  enableColumnOrdering?: boolean;
  enableColumnPinning?: boolean;
  enableColumnSorting?: boolean;
  enableGrouping?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  manualGrouping?: boolean;

  // Controlled state
  sorting?: SortingState;
  tableFilter?: string;
  columnFilters?: ColumnFiltersState;
  rowSelection?: RowSelectionState;
  columnVisibility?: VisibilityState;
  columnOrder?: ColumnOrderState;
  columnPinning?: ColumnPinningState;
  grouping?: GroupingState;
  expanded?: ExpandedState;

  // Callbacks
  onSortingChange?: (updater: SortingState | ((prev: SortingState) => SortingState)) => void;
  onTableFilterChange?: (value: string) => void;
  onColumnFiltersChange?: (updater: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => void;
  onRowSelectionChange?: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
  onColumnVisibilityChange?: (updater: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => void;
  onColumnOrderChange?: (updater: ColumnOrderState | ((prev: ColumnOrderState) => ColumnOrderState)) => void;
  onColumnPinningChange?: (updater: ColumnPinningState | ((prev: ColumnPinningState) => ColumnPinningState)) => void;
  onColumnSizingChange?: (updater: Record<string, number> | ((prev: Record<string, number>) => Record<string, number>)) => void; // ← Added
  onColumnFilterVisiblityChange?: (updater: string[]) => void;
  onGroupingChange?: (updater: GroupingState | ((prev: GroupingState) => GroupingState)) => void;
  onExpandedChange?: (updater: ExpandedState | ((prev: ExpandedState) => ExpandedState)) => void;

  getRowId?: (row: TData, index: number) => string;
  getSubRows?: (row: TData) => TData[] | undefined;
  onRowClick?: (row: Row<TData>) => void;
};

export interface TableDefaultProps<TData = any> extends TableProps<TData> {
  className: string;
  enableRowSelection: boolean;
  enableExpanding: boolean;
  enableColumnResizing: boolean;
  enableColumnOrdering: boolean;
  enableColumnPinning: boolean;
  enableColumnSorting: boolean;
  enableGrouping: boolean;
  manualSorting: boolean;
  manualFiltering: boolean;
  manualGrouping: boolean;
  onSortingChange: (updater: any) => void;
  onTableFilterChange: (value: string) => void;
  onColumnFiltersChange: (updater: any) => void;
  onRowSelectionChange: (updater: any) => void;
  onColumnVisibilityChange: (updater: any) => void;
  onColumnOrderChange: (updater: any) => void;
  onColumnPinningChange: (updater: any) => void;
  onColumnSizingChange: (updater: any) => void;
  onColumnFilterVisiblityChange: (updater: string[]) => void;
  onGroupingChange: (updater: any) => void;
  onExpandedChange: (updater: any) => void;
  getRowId: (row: TData, index: number) => string;
  getSubRows: (row: TData) => TData[] | undefined;
};

export interface TableState<TData = any> {
  headerGroups: HeaderGroup<TData>[];
  rows: Row<TData>[];
  allLeafColumns: Column<TData>[];       // used for colspan in expanded rows
  tableStyle: Record<string, string>;
  // Controlled state
  sorting: SortingState;
  tableFilter: string;
  columnFilters: ColumnFiltersState;
  optionsVisible: string[];
  columnSizing: Record<string, number>;
  visibleColumns: ColumnDef<any>[];
  rowSelection: RowSelectionState;
  columnVisibility: VisibilityState;
  columnOrder: ColumnOrderState;
  columnPinning: ColumnPinningState;
  grouping: GroupingState;
  expanded: ExpandedState;
  dragOverColumnId: string | null; // for column ordering
}

export interface TableMediator<TData = any> {
  state: TableState<TData>;
  table: TableInstance<TData>;
  onMounted: (target: HTMLTableElement) => void;
};
