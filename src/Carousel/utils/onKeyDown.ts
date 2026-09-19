import type {
  CarouselDefaultProps,
  CarouselKeyEvent,
  CarouselState,
} from '../types';
import { next } from './next';
import { prev } from './prev';

/**
 * Handles Carousel directional keyboard navigation.
 *
 * @example
 * ```ts
 * onKeyDown(props, state, event);
 * ```
 */
export function onKeyDown(
  props: CarouselDefaultProps,
  state: CarouselState,
  event: CarouselKeyEvent,
): void {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault?.();
  if (event.key === 'ArrowLeft') prev(props, state);
  if (event.key === 'ArrowRight') next(props, state);
}
