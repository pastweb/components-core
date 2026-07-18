import { reactive, effect, update } from '@pastweb/tools';
import type { ProgressBarDefaultProps, ProgressBarMediator, ProgressBarState } from './types';

export function progressbarMediator(props: ProgressBarDefaultProps): ProgressBarMediator {
  const state = reactive<ProgressBarState>(init());

  function init(): ProgressBarState {
    const { label, size } = props;

    if (typeof props.percentage === 'undefined') {
      if (typeof props.total === 'undefined' && typeof props.current === 'undefined') throw Error('the props "total" and "current" or "percentage" must be defined.');
    }

    const total = props.total as number;
    const current = props.current as number;
    const percentage = props.percentage || Math.min(Math.max((current / total) * 100, 0), 100);

    function renderLabel() {
      if (!label) return null;
      if (typeof label === 'function') return label({ total, current, percentage });
      return `${percentage}${label}`;
    }

    const labelContent = renderLabel();
    // Linear
    const width = `${percentage}%`;
    // Circular
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return {
      circumference,
      offset,
      radius,
      percentage,
      width,
      labelContent,
    }
  }

  effect(() => update(state, init()), props);

  return { state };
}
