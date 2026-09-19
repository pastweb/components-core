import type { InputDefaultProps } from '../types';

/**
 * Normalizes the Input disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: InputDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}
