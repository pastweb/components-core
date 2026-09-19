import type { NotificationDefaultProps } from './types';

/**
 * Normalizes the optional Notification accessible name.
 *
 * An explicit empty `ariaLabel` keeps the notification from becoming a named
 * region.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: NotificationDefaultProps,
): string | undefined {
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the optional Notification region role from the accessible name.
 *
 * @example
 * ```ts
 * getRole(props);
 * ```
 */
export function getRole(
  props: NotificationDefaultProps,
): 'region' | undefined {
  return getAriaLabel(props) ? 'region' : undefined;
}

/**
 * Reports Notification close intent.
 *
 * @example
 * ```ts
 * onClose(props);
 * ```
 */
export function onClose(props: NotificationDefaultProps): void {
  props.onClose();
}
