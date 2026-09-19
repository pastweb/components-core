import type {
  DropDownDefaultProps,
  DropDownKeyEvent,
  DropDownMediatorVars,
  DropDownState,
} from '../types';
import { hide } from './hide';
import { onClick } from './onClick';
import { setPointerPosition } from './setPointerPosition';
import { setVisible } from './setVisible';

/**
 * Handles DropDown keyboard activation and Escape close.
 *
 * @example
 * ```ts
 * onKeyDown(props, state, vars, event);
 * ```
 */
export function onKeyDown(
  props: DropDownDefaultProps,
  state: DropDownState,
  vars: DropDownMediatorVars,
  event: DropDownKeyEvent,
): void {
  if (event.key === 'Escape') {
    if (!state.isVisible) return;
    event.preventDefault?.();
    hide(props, state);
    return;
  }

  if (event.key !== 'Enter' && event.key !== ' ') return;

  event.preventDefault?.();
  if (state.isDisabled) return;
  setPointerPosition(props, vars);
  if (props.visibleOn === 'click') {
    onClick(props, state, vars);
    return;
  }

  setVisible(props, state, !state.isVisible);
}
