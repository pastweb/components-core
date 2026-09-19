import type { CarouselDefaultProps, CarouselState } from '../types';
import { getTransform } from './getTransform';

/**
 * Selects a normalized Carousel item.
 *
 * @example
 * ```ts
 * setCurrent(props, state, current);
 * ```
 */
export function setCurrent(
  props: CarouselDefaultProps,
  state: CarouselState,
  current: number,
): void {
  if (state.isDisabled || state.itemsCount === 0) return;
  const normalized = (current + state.itemsCount) % state.itemsCount;
  state.current = normalized;
  state.transform = getTransform(normalized);
  props.onCurrentChange?.(normalized);
}
