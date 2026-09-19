import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import type {
  InputDefaultProps,
  InputMediator,
  InputMediatorVars,
  InputState,
} from './types';
import {
  getAriaLabel,
  getInputId,
  getIsDisabled,
  getIsLoading,
  onChange,
  onKeyDown,
  stepDown,
  stepUp,
  updateButtonStates,
  useBeforeUnmount,
  useMounted,
} from './utils';

export function inputMediator(props: InputDefaultProps): InputMediator {
  const uid = idCache.getId('input');
  const vars: InputMediatorVars = {
    inputReference: undefined,
  };

  const state = reactive<InputState>({
    ariaLabel: getAriaLabel(props),
    disableDownBtn: undefined,
    disableUpBtn: undefined,
    inputId: getInputId(props, uid),
    isDisabled: getIsDisabled(props),
    isLoading: getIsLoading(props),
  });

  effect(
    () => { state.inputId = getInputId(props, uid); },
    () => props.id,
  );

  effect(
    () => { state.ariaLabel = getAriaLabel(props); },
    () => [props.ariaLabel, props.label],
  );

  effect(
    () => { state.isDisabled = getIsDisabled(props); },
    () => props.disabled,
  );

  effect(
    () => { state.isLoading = getIsLoading(props); },
    () => [props.loading, props.className],
  );

  effect(
    () => updateButtonStates(props, state, vars),
    () => [props.value, props.type, props.min, props.max],
  );

  return {
    onChange: (value, event) => onChange(props, state, vars, value, event),
    onKeyDown: event => onKeyDown(props, state, event),
    state,
    stepDown: () => stepDown(props, state, vars),
    stepUp: () => stepUp(props, state, vars),
    useBeforeUnmount: () => useBeforeUnmount(uid, vars),
    useMounted: inputReference => useMounted(vars, inputReference),
  };
}
