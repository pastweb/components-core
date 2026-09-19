import type { CarouselState } from '../types';

/**
 * Resolves the live-region mode for Carousel slide changes.
 *
 * @example
 * ```ts
 * getAriaLive();
 * ```
 */
export function getAriaLive(): CarouselState['ariaLive'] {
  return 'polite';
}
