import type {
  InputDefaultProps,
  InputMediatorVars,
  InputState,
} from '../types';

/**
 * Updates number-step unavailable state from the current value and constraints.
 *
 * @example
 * ```ts
 * updateButtonStates(props, state, vars);
 * ```
 */
export function updateButtonStates(
  props: InputDefaultProps,
  state: InputState,
  vars: InputMediatorVars,
): void {
  if (props.type !== 'number') return;
  const value = parseFloat(vars.inputReference?.value ?? props.value ?? '') || 0;
  const { min, max } = props;

  if (min !== undefined) {
    state.disableDownBtn = value <= min || undefined;
  }

  if (max !== undefined) {
    state.disableUpBtn = value >= max || undefined;
  }
}
