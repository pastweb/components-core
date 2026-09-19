import type {
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownPointerEvent,
  DropDownState,
} from '../types';
import { hide } from './hide';
import { isInside } from './isInside';
import { setPointerPosition } from './setPointerPosition';
import { setVisible } from './setVisible';

/**
 * Toggles click-activated DropDown visibility after the configured delay.
 *
 * An open DropDown stays open when `hideOnClick` is false. Content clicks hide
 * and never reopen, so an item that already called `hide()` cannot toggle the
 * panel visible again.
 *
 * A context-activated DropDown does not open on click. If it is already open,
 * a click on the trigger hides it.
 *
 * @example
 * ```ts
 * onClick(props, state, vars, event);
 * ```
 */
export function onClick(
  props: DropDownDefaultProps,
  state: DropDownState,
  vars: DropDownMediatorVars,
  event?: DropDownPointerEvent,
): void {
  if (state.isDisabled) return;

  if (props.visibleOn === 'context') {
    if (!state.isVisible || !isInside(vars.targetReference, event?.target)) return;

    vars.elementClicked = true;
    if (vars.clickTimer) clearTimeout(vars.clickTimer);
    hide(props, state);
    vars.clickTimer = setTimeout(() => {
      vars.elementClicked = false;
    }, props.clickTimeGap);
    return;
  }

  if (props.visibleOn !== 'click') return;
  if (state.isVisible && !props.hideOnClick) return;

  vars.elementClicked = true;
  if (vars.clickTimer) clearTimeout(vars.clickTimer);

  const isContentClick = isInside(vars.containerReference, event?.target)
    && !isInside(vars.targetReference, event?.target);

  if (isContentClick) {
    hide(props, state);
    vars.clickTimer = setTimeout(() => {
      vars.elementClicked = false;
    }, props.clickTimeGap);
    return;
  }

  setPointerPosition(props, vars, event);
  vars.clickTimer = setTimeout(() => {
    vars.elementClicked = false;
    setVisible(props, state, !state.isVisible);
    props.onClick();
  }, props.clickTimeGap);
}
