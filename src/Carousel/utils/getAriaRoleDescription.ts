import type { CarouselDefaultProps, CarouselState } from '../types';
import { getAriaLabel } from './getAriaLabel';

/**
 * Normalizes the Carousel role description when the region is named.
 *
 * @example
 * ```ts
 * getAriaRoleDescription(props);
 * ```
 */
export function getAriaRoleDescription(
  props: CarouselDefaultProps,
): CarouselState['ariaRoleDescription'] {
  return getAriaLabel(props) ? 'carousel' : undefined;
}
