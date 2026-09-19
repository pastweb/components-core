import type { FileUploaderDragEvent } from '../types';
import { stopDragEvent } from './stopDragEvent';

/**
 * Keeps the drop target eligible while files move across it.
 *
 * @example
 * ```ts
 * onDragOver(event);
 * ```
 */
export function onDragOver(event: FileUploaderDragEvent): void {
  stopDragEvent(event);
}
