import type {
  ProgressBarDefaultProps,
  ProgressBarState,
} from './types';

/**
 * Normalizes the ProgressBar accessible name.
 *
 * An explicit empty `ariaLabel` omits the name.
 *
 * @example
 * ```ts
 * getAriaLabel(props);
 * ```
 */
export function getAriaLabel(
  props: ProgressBarDefaultProps,
): string | undefined {
  return props.ariaLabel || undefined;
}

/**
 * Calculates determinate ProgressBar state from percentage or total/current.
 *
 * Provide either `percentage` or both `total` and `current`.
 *
 * @example
 * ```ts
 * getProgressBarState({ ...props, percentage: 25 });
 * ```
 */
export function getProgressBarState(
  props: ProgressBarDefaultProps,
): ProgressBarState {
  const { label, size } = props;

  if (typeof props.percentage === 'undefined'
    && (typeof props.total === 'undefined' || typeof props.current === 'undefined')) {
    throw Error('the props "total" and "current" or "percentage" must be defined.');
  }

  const total = props.total;
  const current = props.current;
  const calculated = typeof props.percentage === 'number'
    ? props.percentage
    : total === 0
      ? 0
      : ((current as number) / (total as number)) * 100;
  const percentage = Number.isFinite(calculated)
    ? Math.min(Math.max(calculated, 0), 100)
    : 0;

  function renderLabel() {
    if (!label) return null;
    if (typeof label === 'function') return label({ total, current, percentage });
    return `${percentage}${label}`;
  }

  const labelContent = renderLabel();
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return {
    ariaLabel: getAriaLabel(props),
    circumference,
    offset,
    radius,
    percentage,
    width: `${percentage}%`,
    labelContent,
    valueText: labelContent ?? `${percentage}%`,
  };
}
