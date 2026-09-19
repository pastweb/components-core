import type {
  InputDefaultProps,
  InputMediatorVars,
  InputState,
} from '../types';
import { updateButtonStates } from './updateButtonStates';

/**
 * Decrements an available number Input through its mounted reference.
 *
 * @example
 * ```ts
 * stepDown(props, state, vars);
 * ```
 */
export function stepDown(
  props: InputDefaultProps,
  state: InputState,
  vars: InputMediatorVars,
): void {
  const input = vars.inputReference;
  if (!input?.stepDown || state.isDisabled || state.isLoading || state.disableDownBtn) return;
  input.stepDown();
  updateButtonStates(props, state, vars);
  props.onChange(input.value ?? props.value ?? '', undefined);
}
