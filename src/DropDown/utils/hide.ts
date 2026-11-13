import type {
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownState,
} from '../types';
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
  vars?: DropDownMediatorVars,
): void {
  setVisible(props, state, false, vars);
}
