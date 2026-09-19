import type { WindowControllerVars } from '../../types';

/** Restores focus to the element active before the WindowController opened. */
export function restoreFocus(vars: WindowControllerVars): void {
  vars.previousFocus?.focus();
}
