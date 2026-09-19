import { effect, reactive } from '@pastweb/tools';
import { idCache } from '../utils';
import {
  getActiveTab,
  getAriaLabel,
  getContext as getContextTabs,
  getIsDisabled,
  getOrientation,
  useBeforeUnmount as useBeforeUnmountTabs,
} from './utils';
import type {
  TabsDefaultProps,
  TabsMediator,
  TabsMediatorVars,
  TabsState,
} from './types';

export function tabsMediator(props: TabsDefaultProps): TabsMediator {
  const uid = idCache.getId('tabs');
  const vars: TabsMediatorVars = {
    focusRequestIndex: null,
    tabs: [],
  };

  const state = reactive<TabsState>({
    activeTab: getActiveTab(props),
    ariaLabel: getAriaLabel(props),
    className: props.className,
    isDisabled: getIsDisabled(props),
    orientation: getOrientation(props.className),
  });

  effect(
    () => {
      state.activeTab = getActiveTab(props);
    },
    () => props.activeTab,
  );

  effect(
    () => {
      state.ariaLabel = getAriaLabel(props);
      state.className = props.className;
      state.isDisabled = getIsDisabled(props);
      state.orientation = getOrientation(props.className);
    },
    () => [
      props.ariaLabel,
      props.className,
      props.disabled,
    ],
  );

  return {
    state,
    getContext: () => getContextTabs(props, state, vars, uid),
    useBeforeUnmount: () => useBeforeUnmountTabs(uid),
  };
}
