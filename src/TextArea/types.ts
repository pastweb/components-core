import type { ClassValue } from '@pastweb/tools';
import type { Placement } from '@floating-ui/dom';

export interface TextAreaProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  cols?: number;
  disabled?: boolean;
  id?: string;
  label?: string;
  labelPlacement?: Placement;
  loading?: boolean;
  maxLength?: number;
  name?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  resizeable?: boolean;
  rows?: number;
  tabIndex?: number;
  value?: string;
}

export interface TextAreaDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  cols?: number;
  disabled: boolean;
  id?: string;
  label: string;
  labelPlacement: Placement;
  loading: boolean;
  maxLength?: number;
  name?: string;
  onChange: (value: string) => void;
  placeholder: string;
  readOnly: boolean;
  required: boolean;
  resizeable: boolean;
  rows?: number;
  tabIndex: number;
  value: string;
}

export interface TextAreaState {
  ariaLabel: string | undefined;
  inputId: string;
  isDisabled: true | undefined;
  isLoading: true | undefined;
  isReadOnly: true | undefined;
  isResizeable: true | undefined;
}

export interface TextAreaMediator {
  onChange: (value: string) => void;
  state: TextAreaState;
  useBeforeUnmount: () => void;
}
