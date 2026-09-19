import { idCache } from '../../../utils';
import type { AccordionPanelMediatorVars } from '../types';

/**
 * Clears close timers and releases the generated AccordionPanel ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(vars, uid);
 * ```
 */
export function useBeforeUnmount(
  vars: AccordionPanelMediatorVars,
  uid: string,
): void {
  if (vars.transitionTimer !== undefined) {
    clearTimeout(vars.transitionTimer);
    vars.transitionTimer = undefined;
  }

  vars.triggerReference = null;
  idCache.removeId(uid);
}
