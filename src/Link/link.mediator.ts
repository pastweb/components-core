import { effect, reactive } from '@pastweb/tools';
import type { LinkDefaultProps, LinkMediator, LinkState } from './types';
import { getIsDisabled, onClick } from './utils';

export function linkMediator(props: LinkDefaultProps): LinkMediator {
  const state = reactive<LinkState>({
    isDisabled: getIsDisabled(props),
  });

  effect(
    () => { state.isDisabled = getIsDisabled(props); },
    () => props.disabled,
  );

  return {
    onClick: event => onClick(props, state, event),
    state,
  };
}
