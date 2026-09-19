import type { ClassValue } from '@pastweb/tools';

export interface AccordionProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  rtl?: boolean;
  transitionDuration?: number;
};

export interface AccordionDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  disabled: boolean;
  id?: string;
  rtl: boolean;
  transitionDuration: number;
};

export interface AccordionState {
  ariaLabel: string | undefined;
  isDisabled: true | undefined;
  role: 'group' | undefined;
};

export interface AccordionMediator {
  getContext: () => AccordionContext;
  id: string;
  state: AccordionState;
  useBeforeUnmount: () => void;
};

export interface AccordionContext {
  className: string;
  disabled: true | undefined;
  rtl: boolean;
  transitionDuration: number;
};
