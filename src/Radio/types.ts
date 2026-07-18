import type { ClassValue } from '@pastweb/tools';
import { Placement } from '@floating-ui/dom';

export interface RadioOption {
  label: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  value: any;
  name?: string;
  id?: string;
  tabIndex?: number;
  disabled?: boolean;
};

export interface RadioDefaultOption {
  label: string;
  labelPosition: 'left' | 'right' | 'top' | 'bottom';
  value: any;
  name?: string;
  id: string;
  tabIndex: number;
  disabled?: boolean;
}

export interface RadioProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  orientation?: 'horizontal' | 'vertical' | string;
  disabled?: boolean;
  value?: string;
  name?: string;
  options: RadioOption[];
  onChange?: (value: string, e: any) => void;
  label?: string;
  labelPlacement?: Placement;
};

export interface RadioDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  orientation?: 'horizontal' | 'vertical' | string;
  disabled?: boolean;
  value: string;
  name?: string;
  options: RadioOption[];
  onChange: (value: string, e: any) => void;
  label: string;
  labelPlacement: Placement;
};

export interface RadioState {
  value: string;
  uid: string;
  groupId: string;
  groupLabelId: string;
};

export interface RadioMediator {
  onChange: (value: string, e: any) => void;
  onUnmount: () => void;
  state: RadioState;
};
