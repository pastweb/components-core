import type {
  FileUploaderInputReference,
  FileUploaderMediatorVars,
} from '../types';

/**
 * Stores the mounted file-picker reference.
 *
 * @example
 * ```ts
 * useMounted(vars, inputReference);
 * ```
 */
export function useMounted(
  vars: FileUploaderMediatorVars,
  inputReference: FileUploaderInputReference,
): void {
  vars.inputReference = inputReference;
}
