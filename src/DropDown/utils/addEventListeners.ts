import type {
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownState,
} from '../types';
import { onClickOut } from './onClickOut';

/**
 * Registers document listeners required by the current activation model.
 *
 * Click and context-menu activations outside the DropDown both close it so a
 * second context menu does not leave the previous one open.
 *
 * @example
 * ```ts
 * addEventListeners(props, state, vars);
 * ```
 */
export function addEventListeners(
  props: DropDownDefaultProps,
  state: DropDownState,
  vars: DropDownMediatorVars,
): void {
  if (!vars.rootReference) return;
  if (props.visibleOn !== 'click' && props.visibleOn !== 'context') return;

  if (!vars.outsideClickListener) {
    vars.outsideClickListener = event => onClickOut(props, state, vars, event);
  }

  window.addEventListener('click', vars.outsideClickListener);
  window.addEventListener('contextmenu', vars.outsideClickListener);
}
