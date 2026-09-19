import type { CarouselDefaultProps, CarouselState } from '../types';
import { setCurrent } from './setCurrent';

/**
 * Selects the next Carousel item.
 *
 * @example
 * ```ts
 * next(props, state);
 * ```
 */
export function next(
  props: CarouselDefaultProps,
  state: CarouselState,
): void {
  setCurrent(props, state, state.current + 1);
}
