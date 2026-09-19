import type { CarouselDefaultProps } from '../types';

/**
 * Normalizes Carousel disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(props: CarouselDefaultProps): true | undefined {
  return props.disabled || undefined;
}
