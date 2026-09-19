import type { TooltipDefaultProps, TooltipKeyEvent, TooltipMediatorVars, TooltipState } from '../types';
import { hide } from './hide';

/**
 * Dismisses an open Tooltip on Escape without moving focus.
 *
 * @example
 * ```ts
 * onKeyDown(props, state, vars, event);
 * ```
 */
export function onKeyDown(
  props: TooltipDefaultProps,
  state: TooltipState,
  vars: TooltipMediatorVars,
  event: TooltipKeyEvent,
): void {
  if (event.key !== 'Escape' || !state.isVisible) return;
  event.preventDefault?.();
  hide(props, state, vars, true);
}
