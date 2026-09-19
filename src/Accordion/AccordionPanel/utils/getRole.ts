import type { AccordionPanelDefaultProps } from '../types';

/**
 * Normalizes the optional panel landmark role.
 *
 * @example
 * ```ts
 * getRole(props);
 * ```
 */
export function getRole(
  props: AccordionPanelDefaultProps,
): 'region' | undefined {
  return props.landmark ? 'region' : undefined;
}
