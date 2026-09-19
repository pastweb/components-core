import type { SheetControllerVars } from '../../types';

/** Returns focus to the element that was active before the sheet opened. */
export function restoreFocus(vars: SheetControllerVars): void {
  vars.previousFocus?.focus?.();
}
