import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_PROPS, tableMediator } from '../../src/Table';
import type { TableDefaultProps } from '../../src/Table';

type Person = {
  age: number;
  name: string;
};

function createProps(overrides: Partial<TableDefaultProps<Person>> = {}): TableDefaultProps<Person> {
  return {
    ...DEFAULT_PROPS,
    cls: () => '',
    columns: [
      { id: 'name', accessorKey: 'name', header: 'Name', minSize: 80, maxSize: 240 },
      { id: 'age', accessorKey: 'age', header: 'Age' },
    ],
    data: [{ name: 'Ada', age: 36 }],
    ...overrides,
  } as TableDefaultProps<Person>;
}

describe('tableMediator', () => {
  it('given table props, when initialized on the server, then it exposes rows and columns without a mounted table element', () => {
    const mediator = tableMediator(createProps());

    expect(mediator.state.allLeafColumns.map(column => column.id)).toEqual(['name', 'age']);
    expect(mediator.table.getRowModel().rows).toHaveLength(1);
    expect(mediator.table.getHeaderGroups()).toEqual([]);
  });

  it('given a table instance, when its filter and row selection change, then it reports the next state', () => {
    const onTableFilterChange = vi.fn();
    const onRowSelectionChange = vi.fn();
    const mediator = tableMediator(createProps({ onTableFilterChange, onRowSelectionChange }));

    mediator.table.setTableFilter('Ada');
    mediator.table.toggleRowSelection('0', true);

    expect(mediator.table.getState().tableFilter).toBe('Ada');
    expect(mediator.table.getState().rowSelection).toEqual({ 0: true });
    expect(onTableFilterChange).toHaveBeenCalledWith('Ada');
    expect(onRowSelectionChange).toHaveBeenCalledWith({ 0: true });
  });
});
