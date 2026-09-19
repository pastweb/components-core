import type { DropDownDefaultProps, DropDownState } from '../types';
import { hide } from './hide';

/**
 * Closes a hover-activated DropDown.
 *
 * @example
 * ```ts
 * onMouseLeave(props, state, event);
 * ```
 */
export function onMouseLeave(
  props: DropDownDefaultProps,
  state: DropDownState,
  event?: { buttons?: number },
): void {
  if (state.isDisabled || props.visibleOn !== 'over') return;
  if (event?.buttons) return;

  hide(props, state);
  props.onMouseLeave();
}
