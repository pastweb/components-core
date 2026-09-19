import { effect, reactive, update } from '@pastweb/tools';
import { getProgressBarState } from './utils';
import type { ProgressBarDefaultProps, ProgressBarMediator } from './types';

export function progressbarMediator(props: ProgressBarDefaultProps): ProgressBarMediator {
  const state = reactive(getProgressBarState(props));

  effect(
    () => update(state, getProgressBarState(props)),
    () => [props.ariaLabel, props.current, props.label, props.percentage, props.size, props.total],
  );

  return { state };
}
