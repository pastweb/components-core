import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import type { ButtonsDefaultProps, ButtonsMediator, ButtonsState } from './types';
import {
  getAriaLabel,
  getContext,
  getIsDisabled,
  getRole,
  useBeforeUnmount,
} from './utils';

export function buttonsMediator(props: ButtonsDefaultProps): ButtonsMediator {
  const uid = idCache.getId('buttons');
  const id = props.id ? `_${props.id}` : uid;
  const state = reactive<ButtonsState>({
    ariaLabel: getAriaLabel(props),
    isDisabled: getIsDisabled(props),
    role: getRole(props),
  });

  effect(
    () => {
      state.ariaLabel = getAriaLabel(props);
      state.role = getRole(props);
    },
    () => props.ariaLabel,
  );

  effect(
    () => { state.isDisabled = getIsDisabled(props); },
    () => props.disabled,
  );

  return {
    id,
    state,
    getContext: () => getContext(state),
    useBeforeUnmount: () => useBeforeUnmount(uid),
  };
}
