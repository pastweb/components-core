import { effect, getContextUtils, reactive } from '@pastweb/tools';
import { BUTTONS_CONTEXT_KEY } from '../Buttons';
import type { ButtonsContext } from '../Buttons';
import { idCache } from '../utils';
import type { ButtonDefaultProps, ButtonMediator, ButtonState } from './types';
import {
  getIsDisabled,
  getIsLoading,
  onClick,
  useBeforeUnmount,
} from './utils';

export function buttonMediator(props: ButtonDefaultProps): ButtonMediator {
  const { getContext } = getContextUtils();
  const context = getContext<ButtonsContext>(BUTTONS_CONTEXT_KEY);
  const uid = idCache.getId('button');
  const id = props.id ? `_${props.id}` : uid;
  const state = reactive<ButtonState>({
    isDisabled: getIsDisabled(props, context),
    isLoading: getIsLoading(props),
  });

  effect(
    () => { state.isDisabled = getIsDisabled(props, context); },
    () => [props.disabled, context?.disabled],
  );

  effect(
    () => { state.isLoading = getIsLoading(props); },
    () => [props.loading, props.className],
  );

  return {
    id,
    onClick: event => onClick(props, state, event),
    state,
    useBeforeUnmount: () => useBeforeUnmount(uid),
  };
}
