import type { TooltipDefaultProps, TooltipMediatorVars, TooltipState } from '../types';
import { clearTimers } from './clearTimers';

/**
 * Closes the Tooltip. Blur and Escape close immediately.
 *
 * @example
 * ```ts
 * hide(props, state, vars, true);
 * ```
 */
export function hide(
  props: TooltipDefaultProps,
  state: TooltipState,
  vars: TooltipMediatorVars,
  immediate = false,
): void {
  clearTimers(vars);
  if (immediate) {
    state.isVisible = false;
    return;
  }
  vars.hideTimer = setTimeout(() => {
    state.isVisible = false;
  }, Math.max(0, props.hideDelay));
}
