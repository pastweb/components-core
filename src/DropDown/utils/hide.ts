import type { DropDownDefaultProps, DropDownState } from '../types';
import { setVisible } from './setVisible';

/**
 * Hides an open DropDown.
 *
 * @example
 * ```ts
 * hide(props, state);
 * ```
 */
export function hide(
  props: DropDownDefaultProps,
  state: DropDownState,
): void {
  setVisible(props, state, false);
}
