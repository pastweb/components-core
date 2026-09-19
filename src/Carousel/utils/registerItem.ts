import type { CarouselState } from '../types';

/**
 * Registers a Carousel item and returns its stable index.
 *
 * @example
 * ```ts
 * registerItem(state);
 * ```
 */
export function registerItem(state: CarouselState): number {
  const index = state.itemsCount;
  state.itemsCount += 1;
  return index;
}
