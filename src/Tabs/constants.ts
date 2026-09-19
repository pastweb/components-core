import { noop } from '@pastweb/tools';
import type { TabsDefaultProps } from './types';

export const TABS_CONTEXT_KEY = '$$TabsContext';

export const DEFAULT_PROPS: Partial<TabsDefaultProps> = {
  activeTab: 0,
  ariaLabel: 'Tabs',
  className: '',
  disabled: false,
  onChange: noop,
};
