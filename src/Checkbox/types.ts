import type { ClassValue } from '@pastweb/tools';
import type { Placement } from '@floating-ui/dom';

export interface CheckboxProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  checkChar?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  labelPlacement?: Placement;
  name?: string;
  value?: boolean;
  tabIndex?: number;
  onChange?: (checked: boolean) => void;
};

export interface CheckboxDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  checkChar: string;
  className: string;
  disabled: boolean;
  id?: string;
  label: string;
  labelPlacement: Placement;
  name?: string;
  value: boolean;
  tabIndex: number;
  onChange: (value: boolean) => void;
};

export interface CheckboxState {
  ariaLabel: string | undefined;
  isDisabled: true | undefined;
  value: boolean;
};

export interface CheckboxMediator {
  id: string;
  onChange: (value: boolean) => void;
  state: CheckboxState;
  useBeforeUnmount: () => void;
};
