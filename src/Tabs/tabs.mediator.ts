import { effect, reactive } from '@pastweb/tools';
import type { TabsDefaultProps, TabsMediator, TabsState } from './types';

export function tabsMediator(props: TabsDefaultProps): TabsMediator {
  let tabCount = 0;
  let contentCount = 0;

  const state = reactive<TabsState>({
    activeTab: props.activeTab,
    className: props.className,
    disabled: props.disabled,
  });

  effect(activeTab => { state.activeTab = activeTab }, () => props.activeTab);
  effect(className => { state.className = className }, () => props.className);
  effect(disabled => { state.disabled = disabled }, () => props.disabled);

  function setActiveTab(tab: number) {
    state.activeTab = tab;
  }

  const registerTab = () => tabCount++;
  const registerContent = () => contentCount++;

  return {
    state,
    setActiveTab,
    registerTab,
    registerContent,
  };
}
