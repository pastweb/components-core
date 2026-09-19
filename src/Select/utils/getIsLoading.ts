import type { SelectDefaultProps } from '../types';

/**
 * Normalizes the Select loading state from the `loading` prop or `is-loading` class.
 *
 * @example
 * ```ts
 * getIsLoading(props);
 * ```
 */
export function getIsLoading(
  props: SelectDefaultProps,
): true | undefined {
  return props.loading || props.className.split(/\s+/).includes('is-loading') || undefined;
}
