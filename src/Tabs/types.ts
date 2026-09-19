import type { ClassValue } from '@pastweb/tools';
import type { TabDefaultProps } from './Tab/types';

export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsKeyEvent {
  key: string;
  preventDefault?: () => void;
}

export interface TabsProps {
  cls: (...args: ClassValue[]) => string;
  activeTab?: number;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (index: number) => void;
}

export interface TabsDefaultProps {
  cls: (...args: ClassValue[]) => string;
  activeTab: number;
  ariaLabel: string;
  className: string;
  disabled: boolean;
  onChange: (index: number) => void;
}

export interface TabsState {
  activeTab: number;
  ariaLabel: string | undefined;
  className: string;
  isDisabled: true | undefined;
  orientation: TabsOrientation;
}

export interface TabsMediatorVars {
  focusRequestIndex: number | null;
  tabs: TabDefaultProps[];
}

export interface TabsContext<T = TabDefaultProps> {
  readonly activeTab: number;
  readonly state: TabsState;
  readonly tabs: T[];
  consumeTabFocus: (index: number) => boolean;
  getContentId: (index: number) => string;
  getTabId: (index: number) => string;
  onTabKeyDown: (event: TabsKeyEvent, index: number) => void;
  registerTab: (props: T) => number;
  setActiveTab: (index: number) => void;
  unregisterTab: (props: T) => void;
}

export interface TabsMediator {
  state: TabsState;
  getContext: () => TabsContext;
  useBeforeUnmount: () => void;
}
