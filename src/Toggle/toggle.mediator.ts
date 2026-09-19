import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import { getAriaLabel, getInputId, getIsDisabled, useBeforeUnmount as useBeforeUnmountToggle } from './utils';
import type { ToggleDefaultProps, ToggleMediator, ToggleState } from './types';

export function toggleMediator(props: ToggleDefaultProps): ToggleMediator {
  const uid = idCache.getId('toggle');
  const state = reactive<ToggleState>({
    ariaLabel: getAriaLabel(props),
    inputId: getInputId(props, uid),
    isDisabled: getIsDisabled(props),
    value: !!props.value,
  });

  effect(
    () => {
      if (props.value === state.value) return;
      state.value = !!props.value;
    },
    () => props.value,
  );

  effect(
    () => {
      state.ariaLabel = getAriaLabel(props);
      state.inputId = getInputId(props, uid);
      state.isDisabled = getIsDisabled(props);
    },
    () => [props.ariaLabel, props.disabled, props.id, props.label],
  );

  function onChange(value: boolean, event?: unknown): void {
    if (state.isDisabled) return;
    state.value = value;
    props.onChange(value, event);
  }

  return {
    onChange,
    state,
    useBeforeUnmount: () => useBeforeUnmountToggle(uid),
  };
}
