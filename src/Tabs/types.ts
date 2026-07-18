import type { ClassValue } from '@pastweb/tools';

export interface TabsProps {
  cls: (...args: ClassValue[]) => string
  className?: string
  activeTab?: number;
  disabled?: boolean;
};

export interface TabsDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  activeTab: number;
  disabled: boolean;
};

export interface TabsState {
  activeTab: number;
  className: string;
  disabled: boolean;
};

export interface TabsMediator {
  state: TabsState;
  setActiveTab: (tab: number) => void;
  registerTab: () => number;
  registerContent: () => number;
};

export type TabsContext = TabsMediator;
