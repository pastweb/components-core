import type { ClassValue } from '@pastweb/tools';

export interface AccordionPanelProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
  isOpen?: boolean;
  title?: string | number;
  rtl?: boolean;
  transitionDuration?: number;
};

export interface AccordionPanelDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  disabled: boolean;
  isOpen: boolean;
  title: string | number;
  rtl?: boolean;
  transitionDuration: number;
};

export interface AccordionPanelState {
  isOpen: boolean;
  hideBorderBottom: boolean;
};

export interface AccordionPanelMediator {
  state: AccordionPanelState;
  onToggleClick: () => void;
  uid: string;
  onUnmount: () => void;
};
