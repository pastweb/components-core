/**
 * Orders items into left-pinned, unpinned, then right-pinned groups.
 *
 * @example
 * ```ts
 * orderByPin(headerGroup.headers);
 * ```
 */
export function orderByPin<T extends { column: { isPinned: () => 'left' | 'right' | false } }>(items: T[]): T[] {
  const left: T[] = [];
  const center: T[] = [];
  const right: T[] = [];

  for (const item of items) {
    const pinned = item.column.isPinned();

    if (pinned === 'left') left.push(item);
    else if (pinned === 'right') right.push(item);
    else center.push(item);
  }

  return [...left, ...center, ...right];
}
