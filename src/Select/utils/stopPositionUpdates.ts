import type { SelectMediatorVars } from '../types';

/**
 * Stops Floating UI auto-updates for a Select listbox.
 *
 * @example
 * ```ts
 * stopPositionUpdates(vars);
 * ```
 */
export function stopPositionUpdates(vars: SelectMediatorVars): void {
  vars.stopPositionUpdates?.();
  vars.stopPositionUpdates = undefined;
}
