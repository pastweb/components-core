import type { ClassValue } from '@pastweb/tools';
import type { Placement } from '@floating-ui/dom';

export interface InputProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  autocomplete?: string;
  tabIndex?: number;
  type?: 'text' | 'search' | 'password' | 'email' | 'number';
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  max?: number;
  min?: number;
  step?: number;
  value?: string;
  onChange?: (value: string, event?: unknown) => void;
  onKeyDown?: (event: { key: string; preventDefault?: () => void }) => void;
  label?: string;
  labelPlacement?: Placement;
  incrementTitle?: string;
  decrementTitle?: string;
}

export interface InputDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  autocomplete?: string;
  tabIndex: number;
  type: 'text' | 'search' | 'password' | 'email' | 'number';
  placeholder: string;
  disabled: boolean;
  loading: boolean;
  required: boolean;
  name?: string;
  id?: string;
  max?: number;
  min?: number;
  step?: number;
  value?: string;
  onChange: (value: string, event?: unknown) => void;
  onKeyDown: (event: { key: string; preventDefault?: () => void }) => void;
  label: string;
  labelPlacement: Placement;
  incrementTitle: string;
  decrementTitle: string;
}

export interface InputState {
  ariaLabel: string | undefined;
  disableDownBtn: true | undefined;
  disableUpBtn: true | undefined;
  inputId: string;
  isDisabled: true | undefined;
  isLoading: true | undefined;
}

export interface InputMediatorVars {
  inputReference: InputReference | undefined;
}

export interface InputReference {
  value?: string;
  stepDown?: () => void;
  stepUp?: () => void;
}

export interface InputKeyEvent {
  key: string;
  preventDefault?: () => void;
}

export interface InputMediator {
  onChange: (value: string, event?: unknown) => void;
  onKeyDown: (event: InputKeyEvent) => void;
  state: InputState;
  stepDown: () => void;
  stepUp: () => void;
  useBeforeUnmount: () => void;
  useMounted: (inputReference: InputReference) => void;
}
