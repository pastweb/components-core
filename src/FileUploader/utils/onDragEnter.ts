import type {
  FileUploaderDefaultProps,
  FileUploaderDragEvent,
  FileUploaderState,
} from '../types';
import { stopDragEvent } from './stopDragEvent';

/**
 * Marks the dropzone as active while files are dragged over it.
 *
 * @example
 * ```ts
 * onDragEnter(props, state, event);
 * ```
 */
export function onDragEnter(
  props: FileUploaderDefaultProps,
  state: FileUploaderState,
  event: FileUploaderDragEvent,
): void {
  stopDragEvent(event);
  if (state.isDisabled || !props.dropzone) return;
  state.isDragging = true;
}
