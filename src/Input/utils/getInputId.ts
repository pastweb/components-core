import type { InputDefaultProps } from '../types';

/**
 * Resolves the Input relationship ID from an explicit or generated value.
 *
 * @example
 * ```ts
 * getInputId(props, uid);
 * ```
 */
export function getInputId(
  props: InputDefaultProps,
  uid: string,
): string {
  return props.id || uid;
}
