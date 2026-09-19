import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import {
  getAriaLabel,
  getGroupId,
  getGroupLabelId,
  getIsDisabled,
  getOptionId,
  onChange,
  updateState,
  updateValue,
  useBeforeUnmount,
} from './utils';
import type { RadioDefaultProps, RadioMediator, RadioState } from './types';

export function radioMediator(props: RadioDefaultProps): RadioMediator {
  const uid = idCache.getId('radio');
  const groupId = getGroupId(props, uid);
  const groupLabelId = getGroupLabelId(props, groupId);
  const state = reactive<RadioState>({
    ariaLabel: getAriaLabel(props, groupLabelId),
    groupId,
    groupLabelId,
    isDisabled: getIsDisabled(props),
    value: props.value,
  });

  effect(
    () => updateState(props, state, uid),
    () => [props.ariaLabel, props.disabled, props.id, props.label],
  );

  effect(
    () => updateValue(props, state),
    () => props.value,
  );

  return {
    getOptionId: (index, id) => getOptionId(state.groupId, index, id),
    onChange: (value, e) => onChange(props, state, value, e),
    state,
    useBeforeUnmount: () => useBeforeUnmount(uid),
  };
}
