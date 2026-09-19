import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import {
  getAriaLabel,
  getInputId,
  getIsDisabled,
  getIsLoading,
  getIsReadOnly,
  getIsResizeable,
  onChange as onChangeTextArea,
  useBeforeUnmount as useBeforeUnmountTextArea,
} from './utils';
import type { TextAreaDefaultProps, TextAreaMediator, TextAreaState } from './types';

export function textAreaMediator(props: TextAreaDefaultProps): TextAreaMediator {
  const uid = idCache.getId('textArea');
  const state = reactive<TextAreaState>({
    ariaLabel: getAriaLabel(props),
    inputId: getInputId(props, uid),
    isDisabled: getIsDisabled(props),
    isLoading: getIsLoading(props),
    isReadOnly: getIsReadOnly(props),
    isResizeable: getIsResizeable(props),
  });

  effect(
    () => {
      state.ariaLabel = getAriaLabel(props);
      state.inputId = getInputId(props, uid);
      state.isDisabled = getIsDisabled(props);
      state.isLoading = getIsLoading(props);
      state.isReadOnly = getIsReadOnly(props);
      state.isResizeable = getIsResizeable(props);
    },
    () => [props.ariaLabel, props.className, props.disabled, props.id, props.label, props.loading, props.readOnly, props.resizeable],
  );

  return {
    onChange: value => onChangeTextArea(props, state, value),
    state,
    useBeforeUnmount: () => useBeforeUnmountTextArea(uid),
  };
}
