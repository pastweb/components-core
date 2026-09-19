import { setActiveTab } from './setActiveTab';
import type {
  TabsDefaultProps,
  TabsMediatorVars,
  TabsState,
} from '../types';

/**
 * Selects a Tab and records that keyboard navigation requested its focus.
 *
 * @example
 * ```ts
 * setActiveTabFromKeyboard(props, state, vars, 1);
 * ```
 */
export function setActiveTabFromKeyboard(
  props: TabsDefaultProps,
  state: TabsState,
  vars: TabsMediatorVars,
  index: number,
): void {
  if (index === state.activeTab) return;

  vars.focusRequestIndex = index;
  setActiveTab(props, state, vars, index);

  if (state.activeTab !== index) {
    vars.focusRequestIndex = null;
  }
}
