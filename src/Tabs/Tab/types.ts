import type { ClassValue } from '@pastweb/tools';
import type { TabsKeyEvent } from '../types';

export interface TabProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export interface TabDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className: string;
  disabled: boolean;
  onClick: () => void;
};

export interface TabState {
  ariaLabel: string | undefined;
  className: string;
  controlsId: string;
  id: string;
  index: number;
  isActive: boolean;
  isDisabled: true | undefined;
  tabIndex: 0 | -1;
}

export interface TabButtonReference {
  focus: () => void;
}

export interface TabMediatorVars {
  buttonReference: TabButtonReference | null;
}

export interface TabMediator {
  state: TabState;
  onActivate: () => void;
  onKeyDown: (event: TabsKeyEvent) => void;
  useBeforeUnmount: () => void;
  useMounted: (buttonReference: TabButtonReference) => void;
}
