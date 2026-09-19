import type { AccordionContext } from '../../types';
import type { AccordionPanelDefaultProps } from '../types';

/**
 * Normalizes the panel disabled state from local props and Accordion context.
 *
 * @example
 * ```ts
 * getIsDisabled(props, context);
 * ```
 */
export function getIsDisabled(
  props: AccordionPanelDefaultProps,
  context: AccordionContext,
): true | undefined {
  return props.disabled || context.disabled || undefined;
}
