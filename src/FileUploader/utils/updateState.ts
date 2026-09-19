import type {
  FileUploaderDefaultProps,
  FileUploaderMediatorVars,
  FileUploaderState,
} from '../types';
import { getAriaLabel } from './getAriaLabel';
import { getCanAddMore } from './getCanAddMore';
import { getFiles } from './getFiles';
import { getIsDisabled } from './getIsDisabled';

/**
 * Synchronizes FileUploader semantic state from props and stored files.
 *
 * @example
 * ```ts
 * updateState(props, state, vars);
 * ```
 */
export function updateState(
  props: FileUploaderDefaultProps,
  state: FileUploaderState,
  vars: FileUploaderMediatorVars,
): void {
  const files = getFiles(vars);

  state.ariaLabel = getAriaLabel(props);
  state.canAddMore = getCanAddMore(props, vars);
  state.fileCount = files.length;
  state.files = files;
  state.isDisabled = getIsDisabled(props);
}
