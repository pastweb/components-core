import type {
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownState,
} from '../types';
import { hide } from './hide';
import { isInside } from './isInside';

/**
 * Closes a hover-activated DropDown.
 *
 * @example
 * ```ts
 * onMouseLeave(props, state, vars, event);
 * ```
 */
export function onMouseLeave(
  props: DropDownDefaultProps,
  state: DropDownState,
  vars: DropDownMediatorVars,
  event?: { buttons?: number; relatedTarget?: EventTarget | null },
): void {
  if (state.isDisabled || props.visibleOn !== 'over') return;
  if (event?.buttons) return;
  if (
    isInside(vars.rootReference, event?.relatedTarget) ||
    isInside(vars.containerReference, event?.relatedTarget)
  ) return;

  hide(props, state, vars);
  props.onMouseLeave();
}
