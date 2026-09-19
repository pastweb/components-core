import type { FileUploaderState } from '../types';

/**
 * Clears dropzone drag state when the pointer leaves the drop target.
 *
 * @example
 * ```ts
 * onDragLeave(state);
 * ```
 */
export function onDragLeave(state: FileUploaderState): void {
  state.isDragging = undefined;
}
