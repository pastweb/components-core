import type { AccordionPanelMediatorVars } from '../types';

/**
 * Moves focus to the trigger after a close request so it is not left in hidden content.
 *
 * @example
 * ```ts
 * focusTriggerOnClose(vars, isOpen);
 * ```
 */
export function focusTriggerOnClose(
  vars: AccordionPanelMediatorVars,
  isOpen: boolean,
): void {
  if (isOpen) return;
  vars.triggerReference?.focus();
}
