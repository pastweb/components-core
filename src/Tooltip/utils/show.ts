import type { TooltipDefaultProps, TooltipMediatorVars, TooltipState } from '../types';
import { clearTimers } from './clearTimers';
import { updatePosition } from './updatePosition';

/**
 * Opens an available Tooltip. Focus opens immediately; pointer hover waits.
 *
 * @example
 * ```ts
 * show(props, state, vars, true);
 * ```
 */
export function show(
  props: TooltipDefaultProps,
  state: TooltipState,
  vars: TooltipMediatorVars,
  immediate = false,
): void {
  if (state.isDisabled || !props.content) return;
  clearTimers(vars);
  const open = () => {
    state.isVisible = true;
    updatePosition(props, vars);
  };
  if (immediate) {
    open();
    return;
  }
  vars.showTimer = setTimeout(open, Math.max(0, props.showDelay));
}
