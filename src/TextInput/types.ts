import type { ClassValue } from '@pastweb/tools';

export interface TextInputProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  leftComponent?: any;
  rightComponent?: any;
  loadingComponent?: any;
  autocomplete?: string;
  tabIndex?: number;
  type: 'text' | 'search' | 'password' | 'email' | 'number';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  max?: number;
  min?: number;
  value?: string;
  onChange?: (value: string, e: any) => void;
  onKeyDown?: (e: any) => void;
  label?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  isLoading?: boolean
};

export interface TextInputDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  autocomplete?: string;
  tabIndex: number;
  type: 'text' | 'search' | 'password' | 'email' | 'number';
  placeholder: string;
  disabled: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  max?: number;
  min?: number;
  value?: string;
  onChange: (value: string, e: any) => void;
  onKeyDown: (e: any) => void;
  label?: string;
  labelPosition: 'left' | 'right' | 'top' | 'bottom';
  isLoading: boolean;
};

export type TextInputMediator = {
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
};
