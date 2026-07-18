import type { ClassValue } from '@pastweb/tools';

export interface ToggleProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
  id?: string | number;
  tabIndex?: number;
  name?: string;
  label?: string;
  labelPlacement?: 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  onChange?: (checked: boolean, e: any) => void;
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
  labelPlacement: 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  onChange: (value: boolean, e: any) => void;
  value: boolean;
};

export interface ToggleState {
  inputId: string;
  value: boolean;
};

export interface ToggleMediator {
  onChange: (value: boolean, e: any) => void;
  onUnmount: () => void;
  state: ToggleState;
  uid: string;
};
