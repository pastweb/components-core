import { MODE } from '../../constants';
import type { WindowControllerDefaultProps, WindowControllerVars } from '../../types';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Keeps Tab navigation inside a modal WindowController. */
export function trapFocus(props: WindowControllerDefaultProps, vars: WindowControllerVars, event: KeyboardEvent): void {
  if (props.mode !== MODE.modal || event.key !== 'Tab' || !vars.windowElement) return;
  const focusable = [...vars.windowElement.querySelectorAll<HTMLElement>(FOCUSABLE)];
  const first = focusable[0] ?? vars.windowElement;
  const last = focusable.at(-1) ?? vars.windowElement;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
