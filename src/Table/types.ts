import type { ClassValue } from '@pastweb/tools';

export type Component = any;

/**
 * Table-owned fields on a row record.
 *
 * Feature properties use a leading underscore so they do not collide with
 * application data.
 */
export interface TableRowFeatures<TData = any> {
  _children?: TData[];
  _select?: boolean;
};

export interface ColumnDef<TData = any> {
  id: string;
  accessorKey?: keyof TData;
  accessorFn?: (row: TData) => any;
  header: string | Component | ((props: { column: Column<TData> }) => Component);
  cell?: (props: { row: Row<TData>; getValue: () => any; isExpandable: boolean }) => Component;
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
  toggleSorting: (direction?: 'asc' | 'desc' | false) => void;
  canResize: () => boolean;
  canPin: () => boolean;
  isPinned: () => 'left' | 'right' | false;
  togglePinning: (e: any) => void;
  isVisible: () => boolean;
  toggleVisibility: () => void;
  canFilter: () => boolean;
  canGroup: () => boolean;

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
  onDragEnd: (e: any) => void;
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
    expandedRows: string[];
  };
  setTableFilter: (value: string) => void;
  getHeaderGroups: () => HeaderGroup<TData>[];
  getRowModel: () => { rows: Row<TData>[] };
  getAllLeafColumns: () => Column<TData>[];
  toggleRowSelection: (rowId: string, value?: boolean) => void;
};

export type GetRowId<TData = any> = (row: TData, index: number) => string;

export type SortingState = Array<{ id: string; desc: boolean }>;
export type ColumnFiltersState = Record<string, any>;
export type RowSelectionState = Record<string, boolean>;
export type VisibilityState = Record<string, boolean>;
export type ColumnOrderState = string[];
export type ColumnPinningState = { left: Record<string, number>; right: Record<string, number> };
export type GroupingState = string[];
export type ExpandedState = Record<string, boolean>;

export interface TableProps<TData = any> {
  /**
   * Resolves component, part, and state classes.
   */
  cls: (...args: ClassValue[]) => string;
  /**
   * Names the table when `caption` is absent.
   */
  ariaLabel?: string;
  /**
   * Provides the preferred visible table caption and accessible name.
   */
  caption?: string;
  /**
   * Adds classes to the root container.
   */
  className?: string;
  /**
   * Labels the spanning cell rendered when no rows remain.
   */
  emptyMessage?: string;
  /**
   * Supplies the source records.
   */
  data: TData[];
  /**
   * Defines column identity, values, rendered content, and optional features.
   */
  columns: ColumnDef<TData>[];
  /**
   * Enables row selection. Selection is applied manually through `selectedRows`
   * or `toggleRowSelection`.
   */
  rowSelection?: boolean;
  /**
   * Enables expandable rows. Nested records are read from `_children`.
   * Table feature properties on row data use a leading underscore.
   */
  expanding?: boolean;
  /**
   * Enables pointer and touch column resizing.
   */
  columnResizing?: boolean;
  /**
   * Enables drag-and-drop column ordering.
   */
  columnOrdering?: boolean;
  /**
   * Enables left and right column pinning.
   */
  columnPinning?: boolean;
  /**
   * Enables sorting for every column unless the column sets `sorting`.
   */
  columnSorting?: boolean;
  /**
   * Enables grouping by column.
   */
  grouping?: boolean;
  /**
   * Prevents local sorting so the consumer can supply already-sorted data.
   */
  manualSorting?: boolean;
  /**
   * Prevents local table and column filtering.
   */
  manualFiltering?: boolean;
  /**
   * Prevents local grouping.
   */
  manualGrouping?: boolean;
  /**
   * Controlled sorting descriptors.
   */
  sorting?: SortingState;
  /**
   * Controlled filter applied across row values.
   */
  tableFilter?: string;
  /**
   * Controlled filter values keyed by column ID.
   */
  columnFilters?: ColumnFiltersState;
  /**
   * Controlled selected row IDs.
   */
  selectedRows?: string[];
  /**
   * Controlled visibility keyed by column ID. `false` hides a column.
   */
  columnVisibility?: VisibilityState;
  /**
   * Controlled ordered column IDs.
   */
  columnOrder?: ColumnOrderState;
  /**
   * Controlled expanded row IDs.
   */
  expandedRows?: string[];
  /**
   * Reports the next sorting state.
   */
  onSortingChange?: (updater: SortingState | ((prev: SortingState) => SortingState)) => void;
  /**
   * Reports the next table-wide filter value.
   */
  onTableFilterChange?: (value: string) => void;
  /**
   * Reports the next column filter state.
   */
  onColumnFiltersChange?: (updater: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => void;
  /**
   * Reports the next row-selection map keyed by row ID.
   */
  onRowSelectionChange?: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
  /**
   * Reports the next selected row IDs.
   */
  onSelectedRowsChange?: (ids: string[]) => void;
  /**
   * Reports the next column-visibility state.
   */
  onColumnVisibilityChange?: (updater: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => void;
  /**
   * Reports the next column order.
   */
  onColumnOrderChange?: (updater: ColumnOrderState | ((prev: ColumnOrderState) => ColumnOrderState)) => void;
  /**
   * Reports the next column-pinning state.
   */
  onColumnPinningChange?: (updater: ColumnPinningState | ((prev: ColumnPinningState) => ColumnPinningState)) => void;
  /**
   * Reports the next column widths keyed by column ID.
   */
  onColumnSizingChange?: (updater: Record<string, number> | ((prev: Record<string, number>) => Record<string, number>)) => void;
  /**
   * Reports the column IDs whose option panels are open.
   */
  onColumnFilterVisiblityChange?: (updater: string[]) => void;
  /**
   * Reports the next grouping state.
   */
  onGroupingChange?: (updater: GroupingState | ((prev: GroupingState) => GroupingState)) => void;
  /**
   * Reports the next expanded row IDs.
   */
  onExpandedRowsChange?: (ids: string[]) => void;
  /**
   * Optional override for row identity. When omitted, Table assigns a stable
   * id per row object for the lifetime of the table instance.
   */
  getRowId?: GetRowId<TData>;
  /**
   * Handles row pointer activation.
   */
  onRowClick?: (row: Row<TData>) => void;
  /** Handles scrolling of the table body. */
  onScroll?: (event: unknown) => void;
};

export interface TableDefaultProps<TData = any> extends TableProps<TData> {
  className: string;
  emptyMessage: string;
  rowSelection: boolean;
  expanding: boolean;
  columnResizing: boolean;
  columnOrdering: boolean;
  columnPinning: boolean;
  columnSorting: boolean;
  grouping: boolean;
  manualSorting: boolean;
  manualFiltering: boolean;
  manualGrouping: boolean;
  onSortingChange: (updater: any) => void;
  onTableFilterChange: (value: string) => void;
  onColumnFiltersChange: (updater: any) => void;
  onRowSelectionChange: (updater: any) => void;
  onSelectedRowsChange: (ids: string[]) => void;
  onColumnVisibilityChange: (updater: any) => void;
  onColumnOrderChange: (updater: any) => void;
  onColumnPinningChange: (updater: any) => void;
  onColumnSizingChange: (updater: any) => void;
  onColumnFilterVisiblityChange: (updater: string[]) => void;
  onGroupingChange: (updater: any) => void;
  onExpandedRowsChange: (ids: string[]) => void;
  onScroll: (event: unknown) => void;
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
  dragOverColumnId: string | null;
  draggingColumnId: string | null;
  columnDragRects: Record<string, { left: number; width: number }>;
}

export interface TableContext<TData = any> extends TableInstance<TData> {
  cls: TableDefaultProps['cls'];
  state: TableState<TData>;
  table: TableInstance<TData>;
};

export interface TableMediator<TData = any> {
  /** Unique table prefix used to connect header and cell accessibility IDs. */
  id: string;
  state: TableState<TData>;
  table: TableInstance<TData>;
  getContext: () => TableContext<TData>;
  onMounted: (target: HTMLTableElement) => void;
  onScroll: (event: unknown) => void;
  useBeforeUnmount: () => void;
};
