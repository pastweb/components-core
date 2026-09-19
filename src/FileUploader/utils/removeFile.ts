import type {
  FileUploaderDefaultProps,
  FileUploaderMediatorVars,
  FileUploaderState,
} from '../types';
import { updateState } from './updateState';

/**
 * Removes a stored file by the FormData key used when it was added.
 *
 * @example
 * ```ts
 * removeFile(props, state, vars, file.name);
 * ```
 */
export function removeFile(
  props: FileUploaderDefaultProps,
  state: FileUploaderState,
  vars: FileUploaderMediatorVars,
  fileName: string,
): void {
  vars.formData.delete(fileName);
  updateState(props, state, vars);
}
