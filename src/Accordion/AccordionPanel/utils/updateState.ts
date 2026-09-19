import type { AccordionContext } from '../../types';
import type {
  AccordionPanelDefaultProps,
  AccordionPanelState,
} from '../types';
import { getClassName } from './getClassName';
import { getIsDisabled } from './getIsDisabled';
import { getIsRtl } from './getIsRtl';
import { getRole } from './getRole';
import { getTransitionDuration } from './getTransitionDuration';

/**
 * Synchronizes derived AccordionPanel state from props and parent context.
 *
 * @example
 * ```ts
 * updateState(props, state, context);
 * ```
 */
export function updateState(
  props: AccordionPanelDefaultProps,
  state: AccordionPanelState,
  context: AccordionContext,
): void {
  state.className = getClassName(props, state, context);
  state.isDisabled = getIsDisabled(props, context);
  state.isRtl = getIsRtl(props, context);
  state.role = getRole(props);
  state.transitionDuration = getTransitionDuration(props, context);
}
