import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import {
  getIsDisabled,
  getTooltipId,
  hide as hideTooltip,
  onKeyDown as onKeyDownTooltip,
  show as showTooltip,
  updatePosition,
  useBeforeUnmount as useBeforeUnmountTooltip,
  useMounted as useMountedTooltip,
} from './utils';
import type {
  TooltipDefaultProps,
  TooltipKeyEvent,
  TooltipMediator,
  TooltipMediatorVars,
  TooltipState,
} from './types';

export function tooltipMediator(props: TooltipDefaultProps): TooltipMediator {
  const uid = idCache.getId('tooltip');
  const vars: TooltipMediatorVars = {
    arrowReference: undefined,
    hideTimer: undefined,
    showTimer: undefined,
    tooltipReference: undefined,
    triggerReference: undefined,
  };
  const state = reactive<TooltipState>({
    isDisabled: getIsDisabled(props),
    isVisible: false,
    tooltipId: getTooltipId(props, uid),
  });

  effect(
    () => {
      state.isDisabled = getIsDisabled(props);
      state.tooltipId = getTooltipId(props, uid);
      if (state.isDisabled) hideTooltip(props, state, vars, true);
    },
    () => [props.disabled, props.id],
  );

  effect(
    () => {
      if (state.isVisible) updatePosition(props, vars);
    },
    () => [props.placement, props.offset],
  );

  return {
    hide: immediate => hideTooltip(props, state, vars, immediate),
    onKeyDown: (event: TooltipKeyEvent) => onKeyDownTooltip(props, state, vars, event),
    show: immediate => showTooltip(props, state, vars, immediate),
    state,
    useBeforeUnmount: () => useBeforeUnmountTooltip(uid, vars),
    useMounted: (trigger, tooltip, arrow) => useMountedTooltip(vars, trigger, tooltip, arrow, state.isDisabled ? undefined : state.tooltipId),
  };
}
