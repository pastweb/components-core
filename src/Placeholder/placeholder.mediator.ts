import { effect, reactive } from '@pastweb/tools';
import {
  getAriaHidden,
  getAriaLabel,
  getAriaLive,
  getRole,
} from './utils';
import type {
  PlaceholderDefaultProps,
  PlaceholderMediator,
  PlaceholderState,
} from './types';

export function placeholderMediator(props: PlaceholderDefaultProps): PlaceholderMediator {
  const state = reactive<PlaceholderState>({
    ariaHidden: getAriaHidden(props),
    ariaLabel: getAriaLabel(props),
    ariaLive: getAriaLive(props),
    role: getRole(props),
  });

  effect(
    () => {
      state.ariaHidden = getAriaHidden(props);
      state.ariaLabel = getAriaLabel(props);
      state.ariaLive = getAriaLive(props);
      state.role = getRole(props);
    },
    () => [props.ariaLabel, props.decorative],
  );

  return { state };
}
