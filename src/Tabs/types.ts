import type { ClassValue } from '@pastweb/tools';

export interface Tab {
  label: string | number | any;
  className?: string;
  onClick?: () => void;
  content?: string | number | any;
};

export interface TabDefaultProps {
  label: string | number | any
  className: string
  onClick: () => void
  content: string | number | any
};

export interface TabsProps {
  cls: (...args: ClassValue[]) => string
  className?: string
  tabs: Tab[];
  activeTab?: number;
  content: any;
};

export interface TabsDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  tabs: Tab[];
  activeTab?: number;
  content: any;
};

export interface TabsState {
  activeTab: number;
};

export interface TabsMediator {
  state: TabsState;
  setActiveTab: (tab: number) => void;
};