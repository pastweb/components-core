import type {
  InputDefaultProps,
  InputMediatorVars,
  InputState,
} from '../types';
import { updateButtonStates } from './updateButtonStates';

/**
 * Reports an available Input value change and refreshes step-button state.
 *
 * @example
 * ```ts
 * onChange(props, state, vars, value, event);
 * ```
 */
export function onChange(
  props: InputDefaultProps,
  state: InputState,
  vars: InputMediatorVars,
  value: string,
  event?: unknown,
): void {
  if (state.isDisabled || state.isLoading) return;
  props.onChange(value, event);
  updateButtonStates(props, state, vars);
}
