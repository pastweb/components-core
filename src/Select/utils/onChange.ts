import type { SelectDefaultProps, SelectMediatorVars, SelectState } from '../types';
import { getIsUnavailable } from './getIsUnavailable';
import { onClose } from './onClose';

/**
 * Reports an available selection and optionally closes the listbox.
 *
 * @example
 * ```ts
 * onChange(props, state, vars, 'uk');
 * ```
 */
export function onChange(
  props: SelectDefaultProps,
  state: SelectState,
  vars: SelectMediatorVars,
  value: any,
): void {
  if (getIsUnavailable(props)) return;
  state.value = value;
  props.onChange(value);
  if (props.hideOnClick && props.closeOnSelect) onClose(state, vars, true);
}
