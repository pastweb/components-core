import { reactive, effect } from '@pastweb/tools';
import { idCache } from '../utils';
import type { RangeSliderDefaultProps, RangeSliderMediator, RangeSliderState } from './types';

export function rangeSliderMediator(props: RangeSliderDefaultProps): RangeSliderMediator {
  const uid = idCache.getId();

  const state = reactive<RangeSliderState>({
    value: typeof props.value !== 'undefined' ? `${props.value}` : `${props.max / 2}`,
    uid,
    inputId: props.id ?? `range-slider-input-${uid}`,
  });

  effect(() => { state.inputId = props.id ?? `range-slider-input-${uid}`; }, () => props.id);
  effect(
    () => { state.value = `${props.value}` },
    () => props.value,
  );

  function onChange(value: string, e: any) {
    state.value = value;
    props.onChange(value, e);
  }

  function onMouseUp() {
    props.onMouseUp(parseFloat(state.value));
  }

  const onUnmount = () => idCache.removeId(uid);

  return {
    onChange,
    onMouseUp,
    onUnmount,
    state,
  };
}
