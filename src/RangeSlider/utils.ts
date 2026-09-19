import { idCache } from '../utils';
import type { RangeSliderDefaultProps, RangeSliderState } from './types';

/**
 * Resolves the RangeSlider input ID from an explicit or generated value.
 *
 * Explicit IDs are stored as `_${id}`. Generated IDs use the `rangeSlider` prefix.
 *
 * @example
 * ```ts
 * getInputId(props, uid);
 * ```
 */
export function getInputId(
  props: RangeSliderDefaultProps,
  uid: string,
): string {
  return props.id ? `_${props.id}` : uid;
}

/**
 * Normalizes the RangeSlider accessible name.
 *
 * Visible `label` text names the native control, so `ariaLabel` is omitted
 * then. An explicit empty `ariaLabel` also omits the accessible name.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: RangeSliderDefaultProps,
): string | undefined {
  if (props.label) return undefined;
  return props.ariaLabel || undefined;
}

/**
 * Normalizes the RangeSlider disabled state.
 *
 * @example
 * ```ts
 * getIsDisabled(props);
 * ```
 */
export function getIsDisabled(
  props: RangeSliderDefaultProps,
): true | undefined {
  return props.disabled || undefined;
}

/**
 * Clamps a numeric value to min and max, using the range midpoint when omitted.
 *
 * @example
 * ```ts
 * normalizeValue(props);
 * ```
 */
export function normalizeValue(
  props: RangeSliderDefaultProps,
  value?: number,
): string {
  const fallback = props.min + ((props.max - props.min) / 2);
  return `${Math.min(Math.max(value ?? fallback, props.min), props.max)}`;
}

/**
 * Synchronizes RangeSlider identity and accessibility state.
 *
 * @example
 * ```ts
 * updateState(props, state, uid);
 * ```
 */
export function updateState(
  props: RangeSliderDefaultProps,
  state: RangeSliderState,
  uid: string,
): void {
  state.inputId = getInputId(props, uid);
  state.ariaLabel = getAriaLabel(props);
  state.isDisabled = getIsDisabled(props);
}

/**
 * Synchronizes the RangeSlider value from min, max, and value props.
 *
 * @example
 * ```ts
 * updateValue(props, state);
 * ```
 */
export function updateValue(
  props: RangeSliderDefaultProps,
  state: RangeSliderState,
): void {
  state.value = normalizeValue(props, props.value);
}

/**
 * Reports an available RangeSlider value change.
 *
 * @example
 * ```ts
 * onChange(props, state, '35', event);
 * ```
 */
export function onChange(
  props: RangeSliderDefaultProps,
  state: RangeSliderState,
  value: string,
  e: any,
): void {
  if (getIsDisabled(props)) return;
  state.value = value;
  props.onChange(value, e);
}

/**
 * Reports a committed RangeSlider value through `onMouseUp`.
 *
 * @example
 * ```ts
 * onChangeEnd(props, state);
 * ```
 */
export function onChangeEnd(
  props: RangeSliderDefaultProps,
  state: RangeSliderState,
): void {
  if (getIsDisabled(props)) return;
  props.onMouseUp(parseFloat(state.value));
}

/**
 * Releases the generated RangeSlider ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid);
 * ```
 */
export function useBeforeUnmount(uid: string): void {
  idCache.removeId(uid);
}
