import type { DropDownDefaultProps } from '../types';

/**
 * Normalizes the optional DropDown accessible label.
 *
 * An explicit empty `ariaLabel` omits the accessible name.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: DropDownDefaultProps,
): string | undefined {
  return props.ariaLabel || undefined;
}
