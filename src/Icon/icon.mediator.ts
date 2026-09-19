import { effect, reactive } from '@pastweb/tools';
import {
  checkIconState,
  getAriaHidden,
  getAriaLabel,
  getRole,
  initIconState,
  replaceIconState,
} from './utils';
import type { IconDefaultProps, IconMediator, IconState } from './types';

export function iconMediator(props: IconDefaultProps): IconMediator {
  const resolved = initIconState(props);
  const state = reactive<IconState>({
    ...resolved,
    ariaHidden: getAriaHidden(props),
    ariaLabel: getAriaLabel(props),
    role: getRole(props),
  });

  void checkIconState(props, state);

  effect(
    () => { void replaceIconState(props, state); },
    () => [props.name, props.src, props.collection, props.apiUrl],
  );

  effect(
    () => {
      state.ariaHidden = getAriaHidden(props);
      state.ariaLabel = getAriaLabel(props);
      state.role = getRole(props);
    },
    () => props.ariaLabel,
  );

  return { state };
}
