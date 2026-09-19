import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import { getAriaLabel, getLabelPosition, getStepState, getStepperId, useBeforeUnmount } from './utils';
import type { StepperDefaultProps, StepperMediator, StepperState } from './types';

export function stepperMediator(props: StepperDefaultProps): StepperMediator {
  const uid = idCache.getId('stepper');
  const state = reactive<StepperState>({
    ariaLabel: getAriaLabel(props),
    id: getStepperId(props, uid),
    labelPosition: getLabelPosition(props),
  });

  effect(
    () => {
      state.ariaLabel = getAriaLabel(props);
      state.id = getStepperId(props, uid);
      state.labelPosition = getLabelPosition(props);
    },
    () => [props.ariaLabel, props.id, props.orientation, props.labelPosition],
  );

  return {
    get id() { return state.id; },
    getStepState: index => getStepState(props, index),
    state,
    useBeforeUnmount: () => useBeforeUnmount(uid),
  };
}
