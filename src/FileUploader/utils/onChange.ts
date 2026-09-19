import type {
  FileUploaderChangeEvent,
  FileUploaderDefaultProps,
  FileUploaderMediatorVars,
  FileUploaderState,
} from '../types';
import { addFiles } from './addFiles';
import { toFiles } from './toFiles';

/**
 * Stores files chosen through the native file picker.
 *
 * @example
 * ```ts
 * onChange(props, state, vars, event);
 * ```
 */
export function onChange(
  props: FileUploaderDefaultProps,
  state: FileUploaderState,
  vars: FileUploaderMediatorVars,
  event: FileUploaderChangeEvent,
): void {
  addFiles(props, state, vars, toFiles(event.currentTarget?.files));
}
