import { effect, getContextUtils, reactive } from '@pastweb/tools';
import { idCache } from '../../utils';
import { ACCORDION_CONTEXT_KEY } from '../constants';
import type { AccordionContext } from '../types';
import { focusTriggerOnClose, onToggle, onTransitionEnd, updateState, useBeforeUnmount, useMounted } from './utils';
import type { AccordionPanelDefaultProps, AccordionPanelMediator, AccordionPanelMediatorVars, AccordionPanelState } from './types';

export function accordionPanelMediator(props: AccordionPanelDefaultProps): AccordionPanelMediator {
  const { getContext } = getContextUtils();
  const context = getContext<AccordionContext>(ACCORDION_CONTEXT_KEY)!;
  const uid = idCache.getId('accordionPanel');
  const id = props.id ? `_${props.id}` : uid;
  const panelId = `panel${id}`;
  const triggerId = `trigger${id}`;
  const vars: AccordionPanelMediatorVars = {
    triggerReference: null,
    transitionTimer: undefined,
  };

  const state = reactive<AccordionPanelState>({
    className: '',
    hideBorderBottom: !props.isOpen,
    isDisabled: undefined,
    isOpen: !!props.isOpen,
    isRtl: undefined,
    role: undefined,
    transitionDuration: '',
  });

  updateState(props, state, context);

  effect(
    () => updateState(props, state, context),
    () => [
      context.className,
      context.disabled,
      context.rtl,
      context.transitionDuration,
      props.className,
      props.disabled,
      props.landmark,
      props.rtl,
      props.transitionDuration,
      state.isOpen,
    ],
  );

  effect(
    isOpen => focusTriggerOnClose(vars, isOpen),
    () => state.isOpen,
  );

  return {
    state,
    id,
    triggerId,
    panelId,
    useMounted: triggerReference => useMounted(vars, triggerReference),
    onToggle: () => onToggle(props, state, context, vars),
    onTransitionEnd: () => onTransitionEnd(state, vars),
    useBeforeUnmount: () => useBeforeUnmount(vars, uid),
  };
}
