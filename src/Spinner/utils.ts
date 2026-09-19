import type { SpinnerDefaultProps } from './types';

/**
 * Normalizes the Spinner accessible name.
 *
 * Decorative spinners and empty labels omit the name.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: SpinnerDefaultProps,
): string | undefined {
  if (props.decorative) return undefined;
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the Spinner status role.
 *
 * @example
 * ```ts
 * getRole(props);
 * ```
 */
export function getRole(
  props: SpinnerDefaultProps,
): 'status' | undefined {
  return props.decorative ? undefined : 'status';
}

/**
 * Normalizes the Spinner polite live region.
 *
 * @example
 * ```ts
 * getAriaLive(props);
 * ```
 */
export function getAriaLive(
  props: SpinnerDefaultProps,
): 'polite' | undefined {
  return props.decorative ? undefined : 'polite';
}
