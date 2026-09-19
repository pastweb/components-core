import type { FileUploaderDragEvent } from '../types';

/**
 * Stops a drag event from bubbling and from opening the dropped file.
 *
 * @example
 * ```ts
 * stopDragEvent(event);
 * ```
 */
export function stopDragEvent(event: FileUploaderDragEvent): void {
  event.stopPropagation?.();
  event.preventDefault?.();
}
