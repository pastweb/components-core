import { noop } from '@pastweb/tools';
import type { TableDefaultProps } from './types';

export const TABLE_CONTEXT_KEY = '$$TableContext';

export const DEFAULT_PROPS: Partial<TableDefaultProps> = {
  className: '',
  emptyMessage: 'No data available',
  onSortingChange: noop,
  onTableFilterChange: noop,
  onColumnFiltersChange: noop,
  onRowSelectionChange: noop,
  onSelectedRowsChange: noop,
  onColumnVisibilityChange: noop,
  onColumnOrderChange: noop,
  onColumnPinningChange: noop,
  onColumnSizingChange: noop,
  onColumnFilterVisiblityChange: noop,
  onGroupingChange: noop,
  onExpandedRowsChange: noop,
  onScroll: noop,
};
