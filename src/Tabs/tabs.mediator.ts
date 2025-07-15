import { createState } from '@pastweb/tools';
import type { TabsDefaultProps, TabsMediator, TabsState } from './types';

export function tabs(props: TabsDefaultProps): TabsMediator {
  const { state, setState } = createState<TabsState>({ activeTab: props.activeTab || 0 });

  function setActiveTab(tab: number) {
    setState({ activeTab: tab });
  }

  return {
    state,
    setActiveTab,
  };
}
