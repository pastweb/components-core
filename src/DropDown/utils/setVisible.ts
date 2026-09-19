import type { DropDownDefaultProps, DropDownState } from '../types';

/**
 * Sets DropDown visibility and reports it when the value actually changes.
 *
 * @example
 * ```ts
 * setVisible(props, state, false);
 * ```
 */
export function setVisible(
  props: DropDownDefaultProps,
  state: DropDownState,
  isVisible: boolean,
): void {
  if (state.isVisible === isVisible) return;
  state.isVisible = isVisible;
  props.onChange(isVisible);
}
