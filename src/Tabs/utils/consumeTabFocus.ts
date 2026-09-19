import type { TabsMediatorVars } from '../types';

/**
 * Consumes a pending keyboard focus request for one Tab.
 *
 * @example
 * ```ts
 * if (consumeTabFocus(vars, 1)) button.focus();
 * ```
 */
export function consumeTabFocus(
  vars: TabsMediatorVars,
  index: number,
): boolean {
  if (vars.focusRequestIndex !== index) return false;

  vars.focusRequestIndex = null;
  return true;
}
