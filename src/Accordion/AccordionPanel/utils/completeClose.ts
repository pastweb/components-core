import type {
  AccordionPanelMediatorVars,
  AccordionPanelState,
} from '../types';

/**
 * Finishes a close transition and clears any pending close timer.
 *
 * @example
 * ```ts
 * completeClose(state, vars);
 * ```
 */
export function completeClose(
  state: AccordionPanelState,
  vars: AccordionPanelMediatorVars,
): void {
  if (vars.transitionTimer !== undefined) {
    clearTimeout(vars.transitionTimer);
    vars.transitionTimer = undefined;
  }

  if (!state.isOpen) {
    state.hideBorderBottom = true;
  }
}
