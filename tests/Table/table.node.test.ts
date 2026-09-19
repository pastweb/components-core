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
  it('given global sorting, when a column toggles repeatedly, then it cycles ascending, descending, and unsorted', () => {
    const onSortingChange = vi.fn();
    const mediator = tableMediator(createProps({ columnSorting: true, onSortingChange }));
    const column = mediator.state.allLeafColumns[0];

    column.toggleSorting();
    expect(mediator.state.sorting).toEqual([{ id: 'name', desc: false }]);

    column.toggleSorting();
    expect(mediator.state.sorting).toEqual([{ id: 'name', desc: true }]);

    column.toggleSorting();
    expect(mediator.state.sorting).toEqual([]);
    expect(onSortingChange).toHaveBeenCalledTimes(3);
  });

  it('given ordered columns, when a column moves, then it reports the next order', () => {
    const onColumnOrderChange = vi.fn();
    const mediator = tableMediator(createProps({ onColumnOrderChange }));

    mediator.moveColumn('age', -1);

    expect(mediator.state.columnOrder).toEqual(['age', 'name']);
    expect(onColumnOrderChange).toHaveBeenCalledWith(['age', 'name']);
  });

  it('given column size constraints, when a size exceeds them, then it clamps and reports the size', () => {
    const onColumnSizingChange = vi.fn();
    const mediator = tableMediator(createProps({ onColumnSizingChange }));

    mediator.setColumnSize('name', 20);
    expect(mediator.state.columnSizing.name).toBe(80);

    mediator.setColumnSize('name', 300);
    expect(mediator.state.columnSizing.name).toBe(240);
    expect(onColumnSizingChange).toHaveBeenLastCalledWith({ name: 240 });
  });
});
