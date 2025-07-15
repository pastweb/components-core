import type { ClassValue } from '@pastweb/tools';

export interface ToggleProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
  id?: string | number;
  tabIndex?: number;
  name?: string;
  label?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  onChange?: (checked: boolean) => void;
  value?: boolean;
};

export interface ToggleDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  disabled: boolean;
  id?: string | number;
  tabIndex: number;
  name?: string;
  label?: string;
  labelPosition: 'left' | 'right' | 'top' | 'bottom';
  onChange: (value: boolean) => void;
  value: boolean;
};

export interface ToggleState {
  value: boolean;
};

export interface ToggleMediator {
  state: ToggleState;
  onChange: (value: boolean) => void;
};
