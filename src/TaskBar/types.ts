import type { ClassValue, ManagedWindowState, WindowManager } from '@pastweb/tools';

export interface TaskBarProps {
  cls: (...args: ClassValue[]) => string;
  manager: WindowManager;
  className?: string;
  ariaLabel?: string;
  getLabel?: (window: ManagedWindowState) => string;
}

export interface TaskBarDefaultProps {
  cls: (...args: ClassValue[]) => string;
  manager: WindowManager;
  className: string;
  ariaLabel: string;
  getLabel: (window: ManagedWindowState) => string;
}

export interface TaskBarState {
  activeId: string | null;
  windows: readonly ManagedWindowState[];
}

export interface TaskBarMediator {
  manageWindow: (window: ManagedWindowState) => boolean;
  state: TaskBarState;
}
