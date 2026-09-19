import type {
  TabsDefaultProps,
  TabsMediatorVars,
  TabsState,
} from '../types';

/**
 * Selects an enabled Tab and notifies the consumer.
 *
 * @example
 * ```ts
 * setActiveTab(props, state, vars, 1);
 * ```
 */
export function setActiveTab(
  props: TabsDefaultProps,
  state: TabsState,
  vars: TabsMediatorVars,
  index: number,
): void {
  const tab = vars.tabs[index];

  if (
    state.isDisabled
    || !tab
    || tab.disabled
    || index === state.activeTab
  ) return;

  state.activeTab = index;
  props.onChange(index);
}
