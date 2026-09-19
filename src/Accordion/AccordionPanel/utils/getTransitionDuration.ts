import type { AccordionContext } from '../../types';
import type { AccordionPanelDefaultProps } from '../types';
import { getTransitionDurationMilliseconds } from './getTransitionDurationMilliseconds';

/**
 * Resolves the panel transition duration as a CSS time value.
 *
 * @example
 * ```ts
 * getTransitionDuration(props, context);
 * ```
 */
export function getTransitionDuration(
  props: AccordionPanelDefaultProps,
  context: AccordionContext,
): string {
  return `${getTransitionDurationMilliseconds(props, context)}ms`;
}
