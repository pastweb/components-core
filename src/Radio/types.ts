import type { ClassValue } from '@pastweb/tools';

export interface RadioOption {
  label: string;
  value: any;
  name?: string;
  id?: string;
  tabIndex?: number;
  disabled?: boolean;
};

export interface RadioDefaultOption {
  label: string;
  value: any;
  name?: string;
  id?: string;
  tabIndex: number;
  disabled?: boolean;
}

export interface RadioProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  orientation?: 'horizontal' | 'vertical' | string;
  disabled?: boolean;
  value?: string;
  options: RadioOption[];
  onChange?: (value: string) => void;
  label?: string;
  labelId?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
};

export interface RadioDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  orientation?: 'horizontal' | 'vertical' | string;
  disabled?: boolean;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  label: string;
  labelId?: string;
  labelPosition: 'left' | 'right' | 'top' | 'bottom';
};

export interface RadioState {
  value: string;
};

export interface RadioMediator {
  state: RadioState;
  onChange: (value: string) => void;
};
