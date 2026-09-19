import type { CarouselState } from '../types';

/**
 * Resolves the renderer-ready track transform for the current slide.
 *
 * @example
 * ```ts
 * getTransform(state.current);
 * ```
 */
export function getTransform(current: CarouselState['current']): string {
  return `translateX(-${current * 100}%)`;
}
