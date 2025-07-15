import type { ClassValue } from '@pastweb/tools';

export interface CheckboxProps {
  cls: (...args: ClassValue[]) => string;
  checkChar?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  name?: string;
  value?: boolean;
  tabIndex?: number;
  onChange?: (checked: boolean) => void;
};

export interface CheckboxDefaultProps {
  cls: (...args: ClassValue[]) => string;
  checkChar: string;
  className: string;
  id?: string;
  disabled?: boolean;
  label?: string;
  labelPosition: 'left' | 'right' | 'top' | 'bottom';
  name?: string;
  value: boolean;
  tabIndex: number;
  onChange: (value: boolean) => void;
};
export interface CheckboxState {
  value: boolean;
};

export interface CheckboxMediator {
  state: CheckboxState;
  onChange: (value: boolean) => void;
};
