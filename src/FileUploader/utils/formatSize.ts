import { SIZE_BASE, SIZE_UNITS } from '../constants';

/**
 * Formats a byte size as a human-readable string.
 *
 * @example
 * ```ts
 * formatSize(1536);
 * // '1.5 KB'
 * ```
 */
export function formatSize(
  bytes: number | null,
  decimals: number = 1,
): string {
  if (!bytes) return `0 ${SIZE_UNITS[0]}`;

  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(SIZE_BASE));

  return `${parseFloat((bytes / Math.pow(SIZE_BASE, i)).toFixed(dm))} ${SIZE_UNITS[i]}`;
}
