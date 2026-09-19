import type { InputDefaultProps } from '../types';

/**
 * Normalizes the Input loading state from props and compatibility classes.
 *
 * @example
 * ```ts
 * getIsLoading(props);
 * ```
 */
export function getIsLoading(
  props: InputDefaultProps,
): true | undefined {
  return props.loading
    || props.className.split(/\s+/).includes('is-loading')
    || undefined;
}
