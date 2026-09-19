import type { SelectDefaultProps } from '../types';

/**
 * Normalizes the Select disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: SelectDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}
