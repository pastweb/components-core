/**
 * Converts a native file list or array-like value into a File array.
 *
 * @example
 * ```ts
 * toFiles(event.dataTransfer?.files);
 * ```
 */
export function toFiles(files?: ArrayLike<File> | File[] | null): File[] {
  return files ? Array.from(files) : [];
}
