import { reactive, effect } from '@pastweb/tools';
import { idCache } from '../utils';
import type { CheckboxDefaultProps, CheckboxMediator, CheckboxState } from './types';

export function checkboxMediator(props: CheckboxDefaultProps): CheckboxMediator {
  const state = reactive<CheckboxState>({ value: !!props.value });
  const uid = idCache.getId();

  effect(
    value => {
      if (value === state.value) return;
      state.value = !!value;
    },
    () => props.value,
  );

  function onChange(value: boolean): void {
    if (props.disabled) return;

    state.value = value;
    props.onChange(value);
  }

  const onUnmount = () => idCache.removeId(uid);

  return { state, onChange, uid, onUnmount };
}
