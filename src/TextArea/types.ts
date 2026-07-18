import type { ClassValue } from '@pastweb/tools';

export interface TextAreaProps {
  cls: (...args: ClassValue[]) => string;
  id?: string;
  tabIndex?: number;
  value?: string;
  cols?: number;
  rows?: number;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  label?: string;
  labelPlacement?: 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
}

export interface TextAreaDefaultProps {
  cls: (...args: ClassValue[]) => string;
  id?: string;
  tabIndex?: number;
  value: string;
  cols?: number;
  rows?: number;
  name?: string;
  placeholder: string;
  disabled?: boolean;
  className: string;
  maxLength?: number;
  resizeable?: boolean;
  onChange: (value: string) => void;
  label?: string;
  labelPlacement: 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
}

export interface TextAreaState {
  inputId: string;
  isLoading: boolean;
};

export interface TextAreaMediator {
  state: TextAreaState;
  onUnmount: () => void;
}
