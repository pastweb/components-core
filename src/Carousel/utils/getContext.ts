import type {
  CarouselContext,
  CarouselContextMethods,
  CarouselState,
} from '../types';

/**
 * Creates the live context exposed by a Carousel mediator.
 *
 * @example
 * ```ts
 * getContext(state, methods);
 * ```
 */
export function getContext(
  state: CarouselState,
  methods: CarouselContextMethods,
): CarouselContext {
  return {
    get current() {
      return state.current;
    },
    get isDisabled() {
      return state.isDisabled;
    },
    get itemsCount() {
      return state.itemsCount;
    },
    ...methods,
  };
}
