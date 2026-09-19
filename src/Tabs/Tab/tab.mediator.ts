import { effect, getContextUtils, reactive } from '@pastweb/tools';
import { TABS_CONTEXT_KEY } from '../constants';
import {
  focusButton,
  onActivate,
  onKeyDown,
  updateState,
  useMounted,
} from './utils';
import type { TabsContext } from '../types';
import type { TabDefaultProps, TabMediator, TabMediatorVars, TabState } from './types';

export function tabMediator(props: TabDefaultProps): TabMediator {
  const { getContext } = getContextUtils();
  const context = getContext<TabsContext>(TABS_CONTEXT_KEY)!;
  const index = context.registerTab(props);

  const vars: TabMediatorVars = {
    buttonReference: null,
  };

  const state = reactive<TabState>({
    ariaLabel: undefined,
    className: '',
    controlsId: '',
    id: '',
    index,
    isActive: false,
    isDisabled: undefined,
    tabIndex: -1,
  });

  updateState(props, state, context);

  effect(
    () => updateState(props, state, context),
    () => [
      context.activeTab,
      context.state.className,
      context.state.isDisabled,
      props.ariaLabel,
      props.className,
      props.disabled,
    ],
  );

  effect(
    () => focusButton(state, vars, context),
    () => state.isActive,
  );

  return {
    state,
    onActivate: () => onActivate(props, state, context),
    onKeyDown: event => onKeyDown(state, context, event),
    useBeforeUnmount: () => context.unregisterTab(props),
    useMounted: buttonReference => useMounted(vars, buttonReference),
  };
}
