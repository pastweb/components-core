import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import {
  addEventListeners,
  getAriaLabel,
  getContentId,
  getContext,
  getIsDisabled,
  getTriggerId,
  hide as hideDropDown,
  onBlur,
  onClick as onClickDropDown,
  onContext,
  onKeyDown as onKeyDownDropDown,
  onMouseEnter,
  onMouseLeave,
  removeEventListeners,
  setArrowRef as setArrowRefDropDown,
  updatePosition,
  updateState,
  useBeforeUnmount,
  useMounted,
} from './utils';
import type {
  DropDownDefaultProps,
  DropDownKeyEvent,
  DropDownMediator,
  DropDownMediatorVars,
  DropDownPointerEvent,
} from './types';

export function dropdownMediator(props: DropDownDefaultProps): DropDownMediator {
  const uid = idCache.getId('dropDown');
  const id = props.id ? `_${props.id}` : uid;

  const vars: DropDownMediatorVars = {
    rootReference: undefined,
    targetReference: undefined,
    containerReference: undefined,
    contentReference: undefined,
    arrowReference: undefined,
    clickTimer: undefined,
    elementClicked: false,
    outsideClickListener: undefined,
    pointerPosition: undefined,
  };

  const state = reactive({
    ariaLabel: getAriaLabel(props),
    contentId: getContentId(id),
    isDisabled: getIsDisabled(props),
    isVisible: false,
    triggerId: getTriggerId(id),
  });

  const hide = () => hideDropDown(props, state, vars);
  const onClick = (event?: DropDownPointerEvent) => (
    onClickDropDown(props, state, vars, event)
  );
  const onKeyDown = (event: DropDownKeyEvent) => (
    onKeyDownDropDown(props, state, vars, event)
  );
  const setArrowRef = (arrow?: HTMLElement | null) => (
    setArrowRefDropDown(vars, arrow)
  );

  updateState(props, state, vars);

  effect(
    () => { state.ariaLabel = getAriaLabel(props); },
    () => props.ariaLabel,
  );

  effect(
    () => updateState(props, state, vars),
    () => [props.disabled, props.isVisible],
  );

  effect(
    () => {
      removeEventListeners(vars);
      addEventListeners(props, state, vars);
      if (state.isVisible) updatePosition(props, vars);
    },
    () => props.visibleOn,
  );

  effect(
    () => {
      if (state.isVisible) updatePosition(props, vars);
    },
    () => [state.isVisible, props.arrow, props.placement, props.visibleTarget],
  );

  return {
    getContext: () => getContext(props, state, { hide, onClick, onKeyDown, setArrowRef }, id),
    hide,
    id,
    onBlur: event => onBlur(props, state, vars, event),
    onClick,
    onContext: event => onContext(props, state, vars, event),
    onKeyDown,
    onMouseEnter: event => onMouseEnter(props, state, vars, event),
    onMouseLeave: event => onMouseLeave(props, state, vars, event),
    setArrowRef,
    state,
    useBeforeUnmount: () => useBeforeUnmount(uid, vars),
    useMounted: (root, target, container, content) => (
      useMounted(props, state, vars, root, target, container, content)
    ),
  };
}
