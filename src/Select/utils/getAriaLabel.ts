import type { SelectDefaultProps } from '../types';

/**
 * Normalizes the Select trigger accessible name.
 *
 * Visible `label` text names the trigger, so `ariaLabel` is omitted then.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: SelectDefaultProps,
): string | undefined {
  if (props.label) return undefined;
  return props.ariaLabel || undefined;
}
