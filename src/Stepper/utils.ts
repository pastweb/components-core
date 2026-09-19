import { idCache } from '../utils';
import type { StepDefaultProps, StepperDefaultProps, StepperStepState } from './types';

/**
 * Normalizes the Stepper accessible name.
 *
 * Empty labels are omitted.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: StepperDefaultProps,
): string | undefined {
  return props.ariaLabel || undefined;
}

/**
 * Resolves the Stepper host ID from an explicit or generated value.
 *
 * Explicit IDs are stored as `_${id}`. Generated IDs use the `stepper` prefix.
 *
 * @example
 * ```ts
 * getStepperId(props, uid);
 * ```
 */
export function getStepperId(
  props: StepperDefaultProps,
  uid: string,
): string {
  return props.id ? `_${props.id}` : uid;
}

/**
 * Resolves the visual label position for the current orientation.
 *
 * Horizontal steppers accept `top` or `bottom` and default to `top`. Vertical
 * steppers accept `left` or `right` and default to `right`. Cross-axis values
 * are ignored.
 *
 * @example
 * ```ts
 * getLabelPosition({ orientation: 'vertical', labelPosition: 'top' });
 * ```
 */
export function getLabelPosition(
  props: Pick<StepperDefaultProps, 'orientation' | 'labelPosition'>,
): StepperDefaultProps['labelPosition'] {
  if (props.orientation === 'vertical') {
    return props.labelPosition === 'left' ? 'left' : 'right';
  }
  return props.labelPosition === 'bottom' ? 'bottom' : 'top';
}

/**
 * Classifies a step as active, complete, or pending from the one-based `active` index.
 *
 * @example
 * ```ts
 * getStepState(props, 0);
 * ```
 */
export function getStepState(
  props: StepperDefaultProps,
  index: number,
): StepperStepState {
  if (index === props.active - 1) return 'active';
  return index < props.active - 1 ? 'complete' : 'pending';
}

/**
 * Names a step when no visible label is present.
 *
 * An explicit `ariaLabel` wins. Visible `label` text omits this name so
 * `aria-labelledby` can point at the title.
 *
 * @example
 * ```ts
 * getStepAriaLabel(step, 0, 3);
 * ```
 */
export function getStepAriaLabel(
  step: StepDefaultProps,
  index: number,
  total: number,
): string | undefined {
  if (step.ariaLabel) return step.ariaLabel;
  if (step.label) return undefined;
  return `Step ${index + 1} of ${total}`;
}

/**
 * Releases the generated Stepper ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid);
 * ```
 */
export function useBeforeUnmount(uid: string): void {
  idCache.removeId(uid);
}
