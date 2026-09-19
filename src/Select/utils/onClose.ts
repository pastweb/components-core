import type { SelectMediatorVars, SelectState } from '../types';
import { unregisterOpenSelect } from './registerOpenSelect';
import { stopPositionUpdates } from './stopPositionUpdates';

/**
 * Closes the Select and optionally restores trigger focus.
 *
 * @example
 * ```ts
 * onClose(state, vars, true);
 * ```
 */
export function onClose(
  state: SelectState,
  vars: SelectMediatorVars,
  restoreFocus = false,
): void {
  unregisterOpenSelect(vars.close);
  stopPositionUpdates(vars);
  state.isOpen = false;
  state.highlightIndex = null;
  if (restoreFocus) vars.triggerReference?.focus?.();
}
