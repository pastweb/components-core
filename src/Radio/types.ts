import type { ClassValue } from '@pastweb/tools';
import type { Placement } from '@floating-ui/dom';

export interface RadioOption {
  label: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  value: any;
  name?: string;
  id?: string;
  tabIndex?: number;
  disabled?: boolean;
}

export interface RadioDefaultOption {
  label: string;
  labelPosition: 'left' | 'right' | 'top' | 'bottom';
  value: any;
  name?: string;
  id?: string;
  tabIndex?: number;
  disabled: boolean;
}

export interface RadioProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  id?: string;
  orientation?: 'horizontal' | 'vertical' | string;
  disabled?: boolean;
  value?: string;
  name?: string;
  options: RadioOption[];
  onChange?: (value: string, e: any) => void;
  label?: string;
  labelPlacement?: Placement;
}

export interface RadioDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  id?: string;
  orientation: 'horizontal' | 'vertical' | string;
  disabled: boolean;
  value: string;
  name?: string;
  options: RadioOption[];
  onChange: (value: string, e: any) => void;
  label: string;
  labelPlacement: Placement;
}

export interface RadioState {
  ariaLabel: string | undefined;
  groupId: string;
  groupLabelId: string | undefined;
  isDisabled: true | undefined;
  value: string;
}

export interface RadioMediator {
  getOptionId: (index: number, id?: string) => string;
  onChange: (value: string, e: any) => void;
  state: RadioState;
  useBeforeUnmount: () => void;
}
