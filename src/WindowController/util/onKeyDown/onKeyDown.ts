import type { WindowControllerDefaultProps, WindowControllerVars } from '../../types';
import { trapFocus } from '../trapFocus';

/**
 * Handles WindowController keyboard dismissal.
 *
 * @example
 * ```ts
 * onKeyDown(props, event, closeWindow);
 * ```
 */
export function onKeyDown(props: WindowControllerDefaultProps, e: KeyboardEvent, closeWindow: () => void, vars: WindowControllerVars): void {
  trapFocus(props, vars, e);
  if (e.key === 'Escape' && props.closeOnEscape) {
    closeWindow();
  }
  props.onKeyDown(e);
}
