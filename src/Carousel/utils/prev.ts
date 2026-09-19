import type { CarouselDefaultProps, CarouselState } from '../types';
import { setCurrent } from './setCurrent';

/**
 * Selects the previous Carousel item.
 *
 * @example
 * ```ts
 * prev(props, state);
 * ```
 */
export function prev(
  props: CarouselDefaultProps,
  state: CarouselState,
): void {
  setCurrent(props, state, state.current - 1);
}
