import type { DropDownMediatorVars } from '../types';

/**
 * Removes document listeners registered for DropDown outside activation.
 *
 * @example
 * ```ts
 * removeEventListeners(vars);
 * ```
 */
export function removeEventListeners(vars: DropDownMediatorVars): void {
  if (!vars.outsideClickListener) return;
  window.removeEventListener('click', vars.outsideClickListener);
  window.removeEventListener('contextmenu', vars.outsideClickListener);
}
