import { getSubRows } from './getSubRows';

/**
 * Collects every record in `data`, including nested `_children` rows.
 *
 * @example
 * ```ts
 * collectLiveRows([{ name: 'Ada', _children: [{ name: 'Grace' }] }]);
 * ```
 */
export function collectLiveRows<TData>(data: TData[]): Set<unknown> {
  const live = new Set<unknown>();
  const walk = (rows: TData[]) => {
    for (const row of rows) {
      live.add(row);
      walk(getSubRows(row));
    }
  };
  walk(data);
  return live;
}
