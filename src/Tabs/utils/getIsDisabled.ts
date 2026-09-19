import type { TabsDefaultProps, TabsState } from '../types';

/**
 * Normalizes the Tabs disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: TabsDefaultProps,
): TabsState['isDisabled'] {
  return props.disabled || undefined;
}
