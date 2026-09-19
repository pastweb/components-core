import type {
  FileUploaderKeyEvent,
  FileUploaderMediatorVars,
  FileUploaderState,
} from '../types';
import { onActivate } from './onActivate';

/**
 * Activates the file picker from Enter or Space on a non-button trigger.
 *
 * @example
 * ```ts
 * onKeyDown(state, vars, event);
 * ```
 */
export function onKeyDown(
  state: FileUploaderState,
  vars: FileUploaderMediatorVars,
  event: FileUploaderKeyEvent,
): void {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault?.();
  onActivate(state, vars);
}
