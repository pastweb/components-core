import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import type { ToggleDefaultProps, ToggleMediator, ToggleState } from './types';

export function toggleMediator(props: ToggleDefaultProps): ToggleMediator {
  const uid = idCache.getId();
  const state = reactive<ToggleState>({
    inputId: `${props.id}` || `toggle-${uid}`,
    value: !!props.value,
  });

  effect(
    value => { if (value !== state.value) state.value = value; },
    () => props.value,
  );

  effect(
    () => { state.inputId = `${props.id}` || `toggle-${uid}`; },
    () => props.id,
  );

  function onChange(value: boolean, e: any): void {
    if (props.disabled) return;
    state.value = value;
    props.onChange(value, e);
  }

  const onUnmount = () => idCache.removeId(uid);

  return {
    onChange,
    onUnmount,
    state,
    uid,
  };
}
