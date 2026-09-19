import type { InputDefaultProps } from '../types';

/**
 * Normalizes the optional Input accessible label.
 *
 * Visible `label` text names the native control, so `ariaLabel` is omitted
 * then. An explicit empty `ariaLabel` also omits the accessible name.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: InputDefaultProps,
): string | undefined {
  if (props.label) return undefined;
  return props.ariaLabel || undefined;
}
