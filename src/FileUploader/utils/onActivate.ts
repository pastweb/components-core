import type {
  FileUploaderMediatorVars,
  FileUploaderState,
} from '../types';

/**
 * Opens the file picker when the uploader can accept another file.
 *
 * @example
 * ```ts
 * onActivate(state, vars);
 * ```
 */
export function onActivate(
  state: FileUploaderState,
  vars: FileUploaderMediatorVars,
): void {
  if (state.isDisabled || !state.canAddMore) return;
  vars.inputReference?.click();
}
