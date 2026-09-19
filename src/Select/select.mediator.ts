import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import {
  getAriaLabel,
  getContext,
  getId,
  getIsDisabled,
  getIsLoading,
  getIsUnavailable,
  getLabelId,
  getListboxId,
  getTriggerId,
  onChange as onChangeSelect,
  onClose as onCloseSelect,
  onKeyDown as onKeyDownSelect,
  onOpen as onOpenSelect,
  onOptionKeyDown as onOptionKeyDownSelect,
  onToggle as onToggleSelect,
  registerItem as registerItemSelect,
  updateState,
  useBeforeUnmount as useBeforeUnmountSelect,
  useMounted as useMountedSelect,
} from './utils';
import type {
  SelectDefaultProps,
  SelectKeyEvent,
  SelectMediator,
  SelectMediatorVars,
} from './types';

export function selectMediator(props: SelectDefaultProps): SelectMediator {
  const uid = idCache.getId('select');
  const id = getId(props, uid);

  const vars: SelectMediatorVars = {
    listboxReference: undefined,
    triggerReference: undefined,
    clickTimer: undefined,
    close: () => {},
    itemsCounter: 0,
    outsideClickListener: undefined,
    stopPositionUpdates: undefined,
  };

  const state = reactive({
    ariaLabel: getAriaLabel(props),
    highlightIndex: null as number | null,
    inputId: id,
    isDisabled: getIsDisabled(props),
    isLoading: getIsLoading(props),
    isOpen: false,
    isUnavailable: getIsUnavailable(props),
    labelId: getLabelId(id),
    listboxId: getListboxId(id),
    triggerId: getTriggerId(id),
    value: props.value,
  });

  vars.close = () => onCloseSelect(state, vars);
  const hide = vars.close;
  const onChange = (value: any) => onChangeSelect(props, state, vars, value);
  const onOptionKeyDown = (
    event: SelectKeyEvent,
    value: any,
    disabled?: boolean,
  ) => onOptionKeyDownSelect(props, state, vars, event, value, disabled);
  const registerItem = () => registerItemSelect(vars);

  updateState(props, state, uid);

  effect(
    () => {
      if (props.value !== state.value) state.value = props.value;
    },
    () => props.value,
  );

  effect(
    () => updateState(props, state, uid),
    () => [props.ariaLabel, props.disabled, props.id, props.label, props.loading, props.name, props.className],
  );

  effect(
    () => {
      if (getIsUnavailable(props)) onCloseSelect(state, vars);
    },
    () => [props.disabled, props.loading, props.className],
  );

  return {
    getContext: () => getContext(state, { hide, onChange, onOptionKeyDown, registerItem }),
    hide,
    id,
    onChange,
    onClose: restoreFocus => onCloseSelect(state, vars, restoreFocus),
    onKeyDown: event => onKeyDownSelect(props, state, vars, event),
    onOpen: focus => onOpenSelect(props, state, vars, focus),
    onOptionKeyDown,
    onToggle: () => onToggleSelect(props, state, vars),
    registerItem,
    state,
    useBeforeUnmount: () => useBeforeUnmountSelect(uid, vars),
    useMounted: (trigger, listbox) => useMountedSelect(state, vars, trigger, listbox),
  };
}
