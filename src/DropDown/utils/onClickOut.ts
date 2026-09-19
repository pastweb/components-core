import type {
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownState,
} from '../types';
import { hide } from './hide';
import { isInside } from './isInside';

/**
 * Closes an open DropDown after an outside click or context-menu activation.
 *
 * Activations inside the root or floating container are ignored so interactive
 * content does not count as an outside click.
 *
 * @example
 * ```ts
 * onClickOut(props, state, vars, event);
 * ```
 */
export function onClickOut(
  props: DropDownDefaultProps,
  state: DropDownState,
  vars: DropDownMediatorVars,
  event?: { target?: EventTarget | null },
): void {
  if (
    state.isDisabled ||
    !state.isVisible ||
    vars.elementClicked ||
    !props.hideOnClickOut
  ) return;

  if (
    isInside(vars.rootReference, event?.target) ||
    isInside(vars.containerReference, event?.target)
  ) return;

  hide(props, state);
  props.onClickOut();
}
