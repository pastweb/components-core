import type { CarouselContext } from '../types';
import type { CarouselItemDefaultProps, CarouselItemState } from './types';

/**
 * Resolves whether a CarouselItem is the current slide.
 *
 * @example
 * ```ts
 * getIsActive(props, state, context);
 * ```
 */
export function getIsActive(
  _props: CarouselItemDefaultProps,
  state: CarouselItemState,
  context: CarouselContext | undefined,
): boolean {
  return state.index === context?.current;
}

/**
 * Normalizes local and inherited CarouselItem disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props, state, context);
 * ```
 */
export function getIsDisabled(
  props: CarouselItemDefaultProps,
  _state: CarouselItemState,
  context: CarouselContext | undefined,
): true | undefined {
  return props.disabled || context?.isDisabled || undefined;
}

/**
 * Resolves the complete root class name for a CarouselItem.
 *
 * @example
 * ```ts
 * getClassName(props, state, context);
 * ```
 */
export function getClassName(
  props: CarouselItemDefaultProps,
  state: CarouselItemState,
  context: CarouselContext | undefined,
): string {
  return props.cls(
    'CarouselItem',
    props.className,
    getIsActive(props, state, context) && 'active',
    getIsDisabled(props, state, context) && 'is-disabled',
  );
}

/**
 * Resolves the positional accessible name for a CarouselItem.
 *
 * @example
 * ```ts
 * getAriaLabel(props, state, context);
 * ```
 */
export function getAriaLabel(
  _props: CarouselItemDefaultProps,
  state: CarouselItemState,
  context: CarouselContext | undefined,
): string {
  return `Slide ${state.index + 1} of ${context?.itemsCount ?? 0}`;
}

/**
 * Normalizes whether a CarouselItem is hidden from assistive technology.
 *
 * @example
 * ```ts
 * getAriaHidden(props, state, context);
 * ```
 */
export function getAriaHidden(
  props: CarouselItemDefaultProps,
  state: CarouselItemState,
  context: CarouselContext | undefined,
): true | undefined {
  return getIsActive(props, state, context) ? undefined : true;
}

/**
 * Normalizes whether a CarouselItem must be inert.
 *
 * @example
 * ```ts
 * getInert(props, state, context);
 * ```
 */
export function getInert(
  props: CarouselItemDefaultProps,
  state: CarouselItemState,
  context: CarouselContext | undefined,
): true | undefined {
  return getIsDisabled(props, state, context)
    || getAriaHidden(props, state, context)
    || undefined;
}

/**
 * Synchronizes all renderer-ready CarouselItem state.
 *
 * @example
 * ```ts
 * updateState(props, state, context);
 * ```
 */
export function updateState(
  props: CarouselItemDefaultProps,
  state: CarouselItemState,
  context: CarouselContext | undefined,
): void {
  state.isActive = getIsActive(props, state, context);
  state.isDisabled = getIsDisabled(props, state, context);
  state.ariaHidden = getAriaHidden(props, state, context);
  state.ariaLabel = getAriaLabel(props, state, context);
  state.className = getClassName(props, state, context);
  state.inert = getInert(props, state, context);
}
