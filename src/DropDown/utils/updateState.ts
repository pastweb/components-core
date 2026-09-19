import type { DropDownDefaultProps, DropDownState } from '../types';
import { getAriaLabel } from './getAriaLabel';
import { getIsDisabled } from './getIsDisabled';
import { hide } from './hide';
import { setVisible } from './setVisible';

/**
 * Synchronizes DropDown semantic state from the current props.
 *
 * Disabled DropDowns stay closed even when `isVisible` is requested.
 *
 * @example
 * ```ts
 * updateState(props, state);
 * ```
 */
export function updateState(
  props: DropDownDefaultProps,
  state: DropDownState,
): void {
  state.ariaLabel = getAriaLabel(props);
  state.isDisabled = getIsDisabled(props);

  if (state.isDisabled) {
    hide(props, state);
    return;
  }

  setVisible(props, state, !!props.isVisible);
}
