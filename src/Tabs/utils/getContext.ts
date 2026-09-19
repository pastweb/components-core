import { consumeTabFocus as consumeTabFocusTabs } from './consumeTabFocus';
import { getRelationshipId } from './getRelationshipId';
import { onTabKeyDown as onTabKeyDownTabs } from './onTabKeyDown';
import { registerTab as registerTabTabs } from './registerTab';
import { setActiveTab as setActiveTabTabs } from './setActiveTab';
import { setActiveTabFromKeyboard as setActiveTabFromKeyboardTabs } from './setActiveTabFromKeyboard';
import { unregisterTab as unregisterTabTabs } from './unregisterTab';
import type {
  TabsContext,
  TabsDefaultProps,
  TabsMediatorVars,
  TabsState,
} from '../types';

/**
 * Creates the live context exposed by a Tabs mediator.
 *
 * @example
 * ```ts
 * getContext(props, state, vars, uid);
 * ```
 */
export function getContext(props: TabsDefaultProps, state: TabsState, vars: TabsMediatorVars, uid: string): TabsContext {
  return {
    get activeTab() {
      return state.activeTab;
    },
    get state() {
      return state;
    },
    get tabs() {
      return vars.tabs;
    },
    consumeTabFocus: index => consumeTabFocusTabs(vars, index),
    getContentId: index => getRelationshipId(uid, 'panel', index),
    getTabId: index => getRelationshipId(uid, 'tab', index),
    onTabKeyDown: (event, index) => onTabKeyDownTabs(
      state,
      vars,
      nextIndex => setActiveTabFromKeyboardTabs(props, state, vars, nextIndex),
      event,
      index,
    ),
    registerTab: tabProps => registerTabTabs(vars, tabProps),
    setActiveTab: index => setActiveTabTabs(props, state, vars, index),
    unregisterTab: tabProps => unregisterTabTabs(vars, tabProps),
  };
}
