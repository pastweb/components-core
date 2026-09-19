import { reactive, effect } from '@pastweb/tools';
import { idCache } from '../utils';
import type { CheckboxDefaultProps, CheckboxMediator, CheckboxState } from './types';
import { getAriaLabel, getIsDisabled } from './utils';

export function checkboxMediator(props: CheckboxDefaultProps): CheckboxMediator {
  const uid = idCache.getId('checkbox');
  const id = props.id ? `_${props.id}` : uid;
  const state = reactive<CheckboxState>({
    ariaLabel: getAriaLabel(props),
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
      state.isDisabled = getIsDisabled(props);
    },
    () => [props.ariaLabel, props.disabled, props.label],
  );

  function onChange(value: boolean): void {
    if (state.isDisabled) return;
    state.value = value;
    props.onChange(value);
  }

  return {
    id,
    onChange,
    state,
    useBeforeUnmount: () => idCache.removeId(uid),
  };
}
