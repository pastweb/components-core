import type {
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownState,
} from '../types';
import { hide } from './hide';
import { isInside } from './isInside';

/**
 * Closes an open DropDown when focus leaves the component.
 *
 * Focus moving into the trigger, content, or floating container is ignored so
 * interactive content can keep the panel open.
 *
 * @example
 * ```ts
 * onBlur(props, state, vars, event);
 * ```
 */
export function onBlur(
  props: DropDownDefaultProps,
  state: DropDownState,
  vars: DropDownMediatorVars,
  event?: { relatedTarget?: EventTarget | null },
): void {
  if (state.isDisabled || !state.isVisible || !props.hideOnBlur || !props.hideOnClick) return;
  if (
    isInside(vars.rootReference, event?.relatedTarget) ||
    isInside(vars.containerReference, event?.relatedTarget)
  ) return;

  // hide(props, state);
}
