import type {
  FileUploaderDefaultProps,
  FileUploaderDragEvent,
  FileUploaderMediatorVars,
  FileUploaderState,
} from '../types';
import { addFiles } from './addFiles';
import { stopDragEvent } from './stopDragEvent';
import { toFiles } from './toFiles';

/**
 * Stores dropped files when dropzone behaviour is enabled.
 *
 * @example
 * ```ts
 * onDrop(props, state, vars, event);
 * ```
 */
export function onDrop(
  props: FileUploaderDefaultProps,
  state: FileUploaderState,
  vars: FileUploaderMediatorVars,
  event: FileUploaderDragEvent,
): File[] {
  stopDragEvent(event);
  state.isDragging = undefined;
  if (state.isDisabled || !props.dropzone) return [];

  return addFiles(props, state, vars, toFiles(event.dataTransfer?.files));
}
