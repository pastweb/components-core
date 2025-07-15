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
  loadingComponent?: any;
  label?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  isLoading?: boolean;
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
  className?: string;
  maxLength?: number;
  resizeable?: boolean;
  onChange: (value: string) => void;
  loadingComponent?: any;
  label?: string;
  labelPosition: 'left' | 'right' | 'top' | 'bottom';
  isLoading?: boolean;
}
