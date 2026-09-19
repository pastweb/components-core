import { hashID } from '@pastweb/tools';
import { collectLiveRows } from './collectLiveRows';
import type { GetRowId } from '../types';

const rowIdCache = new Set<string>();

/**
 * Creates a row-id helper that assigns a stable `hashID` to each row.
 *
 * Generated ids are stored in a shared cache so multiple Table instances
 * cannot collide. Call `prune` when `data` changes and `clear` when the
 * table unmounts so unused ids are released.
 *
 * @example
 * ```ts
 * const rowIds = createGetRowId();
 * const row = { name: 'Ada' };
 * rowIds.getRowId(row, 0);
 * rowIds.prune([row]);
 * rowIds.clear();
 * ```
 */
export function createGetRowId(getRowId?: GetRowId) {
  if (getRowId) {
    return {
      getRowId,
      prune(_data: unknown[]) {},
      clear() {},
    };
  }

  const ids = new Map<unknown, string>();

  return {
    getRowId<TData>(row: TData, _index: number): string {
      const cached = ids.get(row);
      if (cached) return cached;

      const id = hashID(rowIdCache, { prefix: 'row-' });
      rowIdCache.add(id);
      ids.set(row, id);
      return id;
    },
    prune<TData>(data: TData[]) {
      const live = collectLiveRows(data);
      for (const [row, id] of ids) {
        if (live.has(row)) continue;
        ids.delete(row);
        rowIdCache.delete(id);
      }
    },
    clear() {
      for (const id of ids.values()) {
        rowIdCache.delete(id);
      }
      ids.clear();
    },
  };
}
