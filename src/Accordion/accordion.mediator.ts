import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import type {
  AccordionDefaultProps,
  AccordionMediator,
  AccordionState,
} from './types';
import {
  getAriaLabel,
  getContext,
  getIsDisabled,
  getRole,
  useBeforeUnmount,
} from './utils';

export function accordionMediator(props: AccordionDefaultProps): AccordionMediator {
  const uid = idCache.getId('accordion');
  const id = props.id ? `_${props.id}` : uid;
  const state = reactive<AccordionState>({
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
    getContext: () => getContext(props, state),
    id,
    state,
    useBeforeUnmount: () => useBeforeUnmount(uid),
  };
}
