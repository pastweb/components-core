import { idCache } from '../utils';
import type { ToggleDefaultProps } from './types';

/**
 * Normalizes the Toggle accessible name.
 *
 * Visible `label` text names the switch, so `ariaLabel` is omitted then.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: ToggleDefaultProps,
): string | undefined {
  if (props.label) return undefined;
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the Toggle disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: ToggleDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}

/**
 * Resolves the Toggle ID from an explicit value or generated id.
 *
 * @example
 * ```ts
 * getInputId(props, uid);
 * ```
 */
export function getInputId(
  props: ToggleDefaultProps,
  uid: string,
): string {
  if (props.id != null && props.id !== '') return `${props.id}`;
  return uid;
}

/**
 * Releases the generated Toggle ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid);
 * ```
 */
export function useBeforeUnmount(uid: string): void {
  idCache.removeId(uid);
}
