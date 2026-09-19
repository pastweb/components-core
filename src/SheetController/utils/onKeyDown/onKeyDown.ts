import type { SheetControllerDefaultProps, SheetControllerVars, SheetKeyboardEvent } from '../../types';
import { trapFocus } from '../trapFocus';

/**
 * Forwards keyboard input, then closes on Escape unless the consumer prevented it.
 *
 * @example
 * ```ts
 * onKeyDown(props, event, closeSheet);
 * ```
 */
export function onKeyDown(
  props: SheetControllerDefaultProps,
  event: SheetKeyboardEvent,
  closeSheet: () => void,
  vars: SheetControllerVars,
): void {
  if (props.modal) trapFocus(event, vars);
  props.onKeyDown(event);
  if (event.key === 'Escape' && props.closeOnEscape && !event.defaultPrevented) {
    event.preventDefault?.();
    closeSheet();
  }
}
