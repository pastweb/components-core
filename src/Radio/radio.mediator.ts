import { computed, reactive, effect } from '@pastweb/tools';
import { idCache } from '../utils';
import type { RadioDefaultProps, RadioMediator, RadioState } from './types';

export function radioMediator(props: RadioDefaultProps): RadioMediator {
  const uid = idCache.getId();

  const state = reactive<RadioState>({
    value: props.value,
    uid,
    groupId: props.name ?? `radio-group-${uid}`,
    groupLabelId: `radio-group-label-${uid}`,
  });

  const groupId = computed(() => props.name ?? `radio-group-${uid}`);

  effect(() => { state.groupId = groupId.value; }, groupId);

  effect(
    (value = '') => {
      if (value !== state.value) state.value = value;
    },
    () => props.value,
  );

  function onChange(value: string = '', e: any): void {
    if (props.disabled) return;

    state.value = value;
    props.onChange(value, e);
  }

  const onUnmount = () => idCache.removeId(uid);

  return { state, onChange, onUnmount };
}
