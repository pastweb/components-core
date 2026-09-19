import type { SheetControllerVars, SheetKeyboardEvent } from '../../types';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Keeps Tab navigation inside a modal sheet. */
export function trapFocus(event: SheetKeyboardEvent, vars: SheetControllerVars): void {
  if (event.key !== 'Tab' || !vars.sheet || typeof document === 'undefined') return;
  const focusable = Array.from(vars.sheet.querySelectorAll?.(FOCUSABLE) ?? []);
  const first = focusable[0] ?? vars.sheet;
  const last = focusable.at(-1) ?? vars.sheet;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault?.();
    last.focus?.();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault?.();
    first.focus?.();
  }
}
