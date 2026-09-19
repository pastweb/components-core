const openSelectClosers: Set<() => void> = new Set();

/**
 * Closes any other open Select, then tracks this instance as the open one.
 *
 * @example
 * ```ts
 * registerOpenSelect(vars.close);
 * ```
 */
export function registerOpenSelect(close: () => void): void {
  for (const other of [...openSelectClosers]) {
    if (other !== close) other();
  }
  openSelectClosers.add(close);
}

/**
 * Stops tracking this Select as the open instance.
 *
 * @example
 * ```ts
 * unregisterOpenSelect(vars.close);
 * ```
 */
export function unregisterOpenSelect(close: () => void): void {
  openSelectClosers.delete(close);
}
