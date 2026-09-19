import type { TabsDefaultProps, TabsState } from '../types';

/**
 * Normalizes the optional accessible tab-list label.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: TabsDefaultProps,
): TabsState['ariaLabel'] {
  return props.ariaLabel || undefined;
}
