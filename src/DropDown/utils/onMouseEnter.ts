import type {
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownPointerEvent,
  DropDownState,
} from '../types';
import { setPointerPosition } from './setPointerPosition';
import { setVisible } from './setVisible';

/**
 * Opens a hover-activated DropDown.
 *
 * @example
 * ```ts
 * onMouseEnter(props, state, vars, event);
 * ```
 */
export function onMouseEnter(
  props: DropDownDefaultProps,
  state: DropDownState,
  vars: DropDownMediatorVars,
  event?: DropDownPointerEvent,
): void {
  if (state.isDisabled || props.visibleOn !== 'over') return;
  setPointerPosition(props, vars, event);
  setVisible(props, state, true);
  props.onMouseEnter();
}
