import type { ClassValue } from '@pastweb/tools';

export interface ButtonProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  id?: string;
  onClick?: (event: unknown) => void;
  disabled?: boolean;
  loading?: boolean;
  tabIndex?: number;
  type?: 'button' | 'submit' | 'reset';
}

export interface ButtonDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  id?: string;
  onClick: (event: unknown) => void;
  disabled: boolean;
  loading: boolean;
  tabIndex: number;
  type: 'button' | 'submit' | 'reset';
}

export interface ButtonState {
  isDisabled: true | undefined;
  isLoading: boolean;
}

export interface ButtonMediator {
  id: string;
  onClick: (event: unknown) => void;
  state: ButtonState;
  useBeforeUnmount: () => void;
}
