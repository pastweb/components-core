import type { SelectMediatorVars } from '../types';

/**
 * Counts mounted listbox options, falling back to registered items.
 *
 * @example
 * ```ts
 * optionCount(vars);
 * ```
 */
export function optionCount(vars: SelectMediatorVars): number {
  return vars.listboxReference?.children?.length ?? vars.itemsCounter;
}
