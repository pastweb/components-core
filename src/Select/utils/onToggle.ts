import type { SelectDefaultProps, SelectMediatorVars, SelectState } from '../types';
import { getIsUnavailable } from './getIsUnavailable';
import { onClose } from './onClose';
import { onOpen } from './onOpen';

/**
 * Toggles an available Select.
 *
 * @example
 * ```ts
 * onToggle(props, state, vars);
 * ```
 */
export function onToggle(
  props: SelectDefaultProps,
  state: SelectState,
  vars: SelectMediatorVars,
): void {
  if (getIsUnavailable(props)) return;
  if (state.isOpen) onClose(state, vars);
  else onOpen(props, state, vars);
}
