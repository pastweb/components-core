import type { ClassValue } from '@pastweb/tools';
import type { Placement } from '@floating-ui/dom';

export interface CheckboxProps {
  cls: (...args: ClassValue[]) => string;
  checkChar?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  labelPlacement?: Placement;
  name?: string;
  value?: boolean;
  tabIndex?: number;
  onChange?: (checked: boolean) => void;
};

export interface CheckboxDefaultProps {
  cls: (...args: ClassValue[]) => string;
  checkChar: string;
  className: string;
  disabled?: boolean;
  label?: string;
  labelPlacement?: Placement;
  name?: string;
  value: boolean;
  tabIndex: number;
  onChange: (value: boolean) => void;
};

export interface CheckboxState {
  value: boolean;
};

export interface CheckboxMediator {
  state: CheckboxState;
  onChange: (value: boolean) => void;
  uid: string;
  onUnmount: () => void;
};
