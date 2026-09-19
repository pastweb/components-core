import { DEFAULT_TRANSITION_DURATION } from '../constants';
import type { AccordionContext } from '../../types';
import type { AccordionPanelDefaultProps } from '../types';

/**
 * Resolves the panel transition duration in milliseconds.
 *
 * @example
 * ```ts
 * getTransitionDurationMilliseconds(props, context);
 * ```
 */
export function getTransitionDurationMilliseconds(
  props: AccordionPanelDefaultProps,
  context: AccordionContext,
): number {
  return props.transitionDuration ?? context.transitionDuration ?? DEFAULT_TRANSITION_DURATION;
}
