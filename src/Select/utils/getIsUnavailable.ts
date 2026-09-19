import type { SelectDefaultProps } from '../types';
import { getIsDisabled } from './getIsDisabled';
import { getIsLoading } from './getIsLoading';

/**
 * Normalizes combined Select unavailability.
 *
 * @example
 * ```ts
 * getIsUnavailable(props);
 * ```
 */
export function getIsUnavailable(
  props: SelectDefaultProps,
): true | undefined {
  return getIsDisabled(props) || getIsLoading(props) || undefined;
}
