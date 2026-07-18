import type { ClassValue } from '@pastweb/tools';
import type { Placement } from '@floating-ui/dom';

export interface InputProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  autocomplete?: string;
  tabIndex?: number;
  type?: 'text' | 'search' | 'password' | 'email' | 'number';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  max?: number;
  min?: number;
  step?: number;
  value?: string;
  onChange?: (value: string, e: any) => void;
  onKeyDown?: (e: any) => void;
  label?: string;
  labelPlacement?: Placement;
  incrementTitle?: string;
  decrementTitle?: string;
};

export interface InputDefaultProps {
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
  step?: number;
  value?: string;
  onChange: (value: string, e: any) => void;
  onKeyDown: (e: any) => void;
  label?: string;
  labelPlacement: Placement;
  incrementTitle: string;
  decrementTitle: string;
};

export interface InputState {
  inputId: string;
  isLoading: boolean;
  disableUpBtn: boolean;
  disableDownBtn: boolean;
};

export interface InputMediator {
  state: InputState;
  onChange: (value: string, e: any) => void;
  onKeyDown: (e: any) => void;
  stepDown: () => void;
  stepUp: () => void;
  useMounted: (inputElement: HTMLInputElement) => void;
  useBeforeUnmount: () => void;
};
