import type { ClassValue } from '@pastweb/tools';

export interface ButtonsProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
};

export interface ButtonsDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  disabled: boolean;
  id?: string;
};

export interface ButtonsState {
  ariaLabel: string | undefined;
  isDisabled: true | undefined;
  role: 'group' | undefined;
};

export interface ButtonsMediator {
  id: string;
  state: ButtonsState;
  getContext: () => ButtonsContext;
  useBeforeUnmount: () => void;
};

export interface ButtonsContext {
  disabled: true | undefined;
};
