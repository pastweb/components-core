import type { AccordionContext } from '../../types';
import type { AccordionPanelDefaultProps } from '../types';

/**
 * Normalizes the panel text direction from local props and Accordion context.
 *
 * @example
 * ```ts
 * getIsRtl(props, context);
 * ```
 */
export function getIsRtl(
  props: AccordionPanelDefaultProps,
  context: AccordionContext,
): true | undefined {
  return props.rtl || context.rtl || undefined;
}
