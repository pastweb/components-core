import type { DropDownDefaultProps } from '../types';

/**
 * Normalizes the DropDown disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: DropDownDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}
