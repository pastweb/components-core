import type { ClassValue } from '@pastweb/tools';

export interface AccordionProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  rtl?: boolean;
  transitionDuration?: number;
};

export interface AccordionDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className: string;
  disabled: boolean;
  rtl: boolean;
  transitionDuration: number;
};

export interface AccordionMediator {
  getContext: () => AccordionContext;
};

export interface AccordionContext {
  className: string;
  disabled: boolean;
  rtl: boolean;
};


