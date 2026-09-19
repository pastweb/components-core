import type { SelectDefaultProps, SelectMediatorVars, SelectState } from '../types';
import { focusOption } from './focusOption';
import { getIsUnavailable } from './getIsUnavailable';
import { optionCount } from './optionCount';
import { registerOpenSelect } from './registerOpenSelect';
import { startPositionUpdates } from './startPositionUpdates';

/**
 * Opens an available Select and optionally focuses the first or last option.
 *
 * @example
 * ```ts
 * onOpen(props, state, vars, 'first');
 * ```
 */
export function onOpen(
  props: SelectDefaultProps,
  state: SelectState,
  vars: SelectMediatorVars,
  focus?: 'first' | 'last',
): void {
  if (getIsUnavailable(props)) return;
  registerOpenSelect(vars.close);
  state.isOpen = true;
  startPositionUpdates(props, vars);
  if (focus) focusOption(state, vars, focus === 'last' ? optionCount(vars) - 1 : 0);
}
