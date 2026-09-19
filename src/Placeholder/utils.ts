import type { PlaceholderDefaultProps } from './types';

/**
 * Normalizes the Placeholder accessible name.
 *
 * Decorative placeholders and empty labels omit the name.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: PlaceholderDefaultProps,
): string | undefined {
  if (props.decorative) return undefined;
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the Placeholder status role.
 *
 * @example
 * ```ts
 * getRole(props);
 * ```
 */
export function getRole(
  props: PlaceholderDefaultProps,
): 'status' | undefined {
  return props.decorative ? undefined : 'status';
}

/**
 * Normalizes the Placeholder polite live region.
 *
 * @example
 * ```ts
 * getAriaLive(props);
 * ```
 */
export function getAriaLive(
  props: PlaceholderDefaultProps,
): 'polite' | undefined {
  return props.decorative ? undefined : 'polite';
}

/**
 * Normalizes decorative hiding when the Placeholder is not a status.
 *
 * @example
 * ```ts
 * getAriaHidden(props);
 * ```
 */
export function getAriaHidden(
  props: PlaceholderDefaultProps,
): true | undefined {
  return props.decorative ? true : undefined;
}
