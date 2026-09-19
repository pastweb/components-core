import type {
  DropDownContextEvent,
  DropDownDefaultProps,
  DropDownMediatorVars,
  DropDownState,
} from '../types';
import { setPointerPosition } from './setPointerPosition';
import { setVisible } from './setVisible';

/**
 * Toggles context-activated DropDown visibility after the configured delay.
 *
 * @example
 * ```ts
 * onContext(props, state, vars, event);
 * ```
 */
export function onContext(props: DropDownDefaultProps, state: DropDownState, vars: DropDownMediatorVars, event: DropDownContextEvent): void {
  if (state.isDisabled || props.visibleOn !== 'context') return;

  event.preventDefault?.();
  setPointerPosition(props, vars, event);
  vars.elementClicked = true;

  if (vars.clickTimer) clearTimeout(vars.clickTimer);

  vars.clickTimer = setTimeout(() => {
    vars.elementClicked = false;
    setVisible(props, state, !state.isVisible);
    props.onContext();
  }, props.clickTimeGap);
}
