import type { SelectMediatorVars } from '../types';

/**
 * Registers a SelectItem and returns its index.
 *
 * @example
 * ```ts
 * registerItem(vars);
 * ```
 */
export function registerItem(vars: SelectMediatorVars): number {
  return vars.itemsCounter++;
}
