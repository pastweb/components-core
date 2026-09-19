import type { AccordionContext } from '../../types';
import type {
  AccordionPanelDefaultProps,
  AccordionPanelMediatorVars,
  AccordionPanelState,
} from '../types';
import { completeClose } from './completeClose';
import { getIsDisabled } from './getIsDisabled';
import { getTransitionDurationMilliseconds } from './getTransitionDurationMilliseconds';

/**
 * Toggles the panel open state and reports the requested change.
 *
 * @example
 * ```ts
 * onToggle(props, state, context, vars);
 * ```
 */
export function onToggle(
  props: AccordionPanelDefaultProps,
  state: AccordionPanelState,
  context: AccordionContext,
  vars: AccordionPanelMediatorVars,
): void {
  if (getIsDisabled(props, context)) return;

  state.isOpen = !state.isOpen;

  if (state.isOpen) {
    if (vars.transitionTimer !== undefined) {
      clearTimeout(vars.transitionTimer);
      vars.transitionTimer = undefined;
    }

    state.hideBorderBottom = false;
  } else {
    vars.transitionTimer = setTimeout(
      () => completeClose(state, vars),
      getTransitionDurationMilliseconds(props, context),
    );
  }

  props.onOpenChange?.(state.isOpen);
}
