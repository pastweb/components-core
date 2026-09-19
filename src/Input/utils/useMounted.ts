import type {
  InputMediatorVars,
  InputReference,
} from '../types';

/**
 * Stores the mounted Input reference.
 *
 * @example
 * ```ts
 * useMounted(vars, inputReference);
 * ```
 */
export function useMounted(
  vars: InputMediatorVars,
  inputReference: InputReference,
): void {
  vars.inputReference = inputReference;
}
