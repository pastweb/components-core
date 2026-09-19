import type {
  InputDefaultProps,
  InputMediatorVars,
  InputState,
} from '../types';
import { updateButtonStates } from './updateButtonStates';

/**
 * Increments an available number Input through its mounted reference.
 *
 * @example
 * ```ts
 * stepUp(props, state, vars);
 * ```
 */
export function stepUp(
  props: InputDefaultProps,
  state: InputState,
  vars: InputMediatorVars,
): void {
  const input = vars.inputReference;
  if (!input?.stepUp || state.isDisabled || state.isLoading || state.disableUpBtn) return;
  input.stepUp();
  updateButtonStates(props, state, vars);
  props.onChange(input.value ?? props.value ?? '', undefined);
}
