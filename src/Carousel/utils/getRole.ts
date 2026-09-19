import type { CarouselDefaultProps, CarouselState } from '../types';
import { getAriaLabel } from './getAriaLabel';

/**
 * Normalizes the Carousel region role when the component is named.
 *
 * @example
 * ```ts
 * getRole(props);
 * ```
 */
export function getRole(props: CarouselDefaultProps): CarouselState['role'] {
  return getAriaLabel(props) ? 'region' : undefined;
}
