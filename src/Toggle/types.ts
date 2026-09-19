import type { ClassValue } from '@pastweb/tools';
import type { Placement } from '@floating-ui/dom';

export interface ToggleProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  id?: string | number;
  label?: string;
  labelPlacement?: Placement;
  name?: string;
  onChange?: (checked: boolean, event?: unknown) => void;
  tabIndex?: number;
  value?: boolean;
}

export interface ToggleDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  disabled: boolean;
  id?: string | number;
  label: string;
  labelPlacement: Placement;
  name?: string;
  onChange: (checked: boolean, event?: unknown) => void;
  tabIndex: number;
  value: boolean;
}

export interface ToggleState {
  ariaLabel: string | undefined;
  inputId: string;
  isDisabled: true | undefined;
  value: boolean;
}

export interface ToggleMediator {
  onChange: (value: boolean, event?: unknown) => void;
  state: ToggleState;
  useBeforeUnmount: () => void;
}
