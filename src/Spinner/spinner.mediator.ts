import { effect, reactive } from '@pastweb/tools';
import { getAriaLabel, getAriaLive, getRole } from './utils';
import type { SpinnerDefaultProps, SpinnerMediator, SpinnerState } from './types';

export function spinnerMediator(props: SpinnerDefaultProps): SpinnerMediator {
  const state = reactive<SpinnerState>({
    ariaLabel: getAriaLabel(props),
    ariaLive: getAriaLive(props),
    role: getRole(props),
  });

  effect(
    () => {
      state.ariaLabel = getAriaLabel(props);
      state.ariaLive = getAriaLive(props);
      state.role = getRole(props);
    },
    () => [props.ariaLabel, props.decorative],
  );

  return { state };
}
