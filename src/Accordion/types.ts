import type { ClassValue } from '@pastweb/tools';

export interface AccordionPanelProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  title?: string | number;
  rtl?: boolean;
  transitionDuration?: number;
  header?: any;
  content: string | number;
  isOpen?: boolean;
};

export interface AccordionPanelDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  title: string | number;
  rtl: boolean;
  transitionDuration: number;
  header?: any;
  content: string | number;
  isOpen: boolean;
};

export type AccordionItem = Omit<AccordionPanelProps, 'cls'>;

export interface AccordionProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  rtl?: boolean;
  transitionDuration?: number;
  items: AccordionItem[];
};

export interface AccordionDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  rtl: boolean;
  transitionDuration: number;
  items: AccordionItem[];
};

export interface AccordionPanelState {
  isOpen: boolean;
  hideBorderBottom: boolean;
}

export interface AccordionPanelMediatior {
  state: AccordionPanelState;
  onToggleClick: () => void;
}
