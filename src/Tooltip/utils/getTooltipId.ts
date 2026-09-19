import type { TooltipDefaultProps } from '../types';

/**
 * Resolves the tooltip ID from an explicit value or generated id.
 *
 * @example
 * ```ts
 * getTooltipId(props, uid);
 * ```
 */
export function getTooltipId(
  props: TooltipDefaultProps,
  uid: string,
): string {
  return props.id || uid;
}
