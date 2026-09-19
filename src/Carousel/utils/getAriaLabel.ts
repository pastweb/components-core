import type { CarouselDefaultProps } from '../types';

/**
 * Normalizes the optional accessible name for a Carousel.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(props: CarouselDefaultProps): string | undefined {
  return props.ariaLabel || undefined;
}
