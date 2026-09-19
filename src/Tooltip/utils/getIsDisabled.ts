import type { TooltipDefaultProps } from '../types';

/**
 * Normalizes the Tooltip disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: TooltipDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}
