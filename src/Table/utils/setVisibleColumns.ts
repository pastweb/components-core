import type { TableDefaultProps, TableState } from '../types';

export function setVisibleClumns(props: TableDefaultProps, state: TableState): void {
  const { columns, columnVisibility = {} } = props;
  const { columnOrder } = state;

  state.visibleColumns = columns.filter((col) => columnVisibility[col.id] !== false).sort((a, b) => columnOrder.indexOf(a.id) - columnOrder.indexOf(b.id));
}
