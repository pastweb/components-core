import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import {
  getAriaLabel,
  getInputId,
  getIsDisabled,
  normalizeValue,
  onChange,
  onChangeEnd,
  updateState,
  updateValue,
  useBeforeUnmount,
} from './utils';
import type { RangeSliderDefaultProps, RangeSliderMediator, RangeSliderState } from './types';

export function rangeSliderMediator(props: RangeSliderDefaultProps): RangeSliderMediator {
  const uid = idCache.getId('rangeSlider');

  const state = reactive<RangeSliderState>({
    ariaLabel: getAriaLabel(props),
    inputId: getInputId(props, uid),
    isDisabled: getIsDisabled(props),
    value: normalizeValue(props, props.value),
  });

  effect(
    () => updateState(props, state, uid),
    () => [props.ariaLabel, props.disabled, props.id, props.label],
  );

  effect(
    () => updateValue(props, state),
    () => [props.max, props.min, props.value],
  );

  return {
    onChange: (value, e) => onChange(props, state, value, e),
    onChangeEnd: () => onChangeEnd(props, state),
    state,
    useBeforeUnmount: () => useBeforeUnmount(uid),
  };
}
