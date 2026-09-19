import type { ClassValue } from '@pastweb/tools';

export interface Step {
  ariaLabel?: string;
  className?: string;
  content?: any;
  description?: string;
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
}

export interface StepDefaultProps {
  ariaLabel?: string;
  className: string;
  content?: any;
  description: string;
  disabled: boolean;
  label: string;
  onClick: () => void;
}

export interface StepperProps {
  cls: (...args: ClassValue[]) => string;
  steps: Step[];
  active?: number;
  ariaLabel?: string;
  className?: string;
  id?: string;
  orientation?: 'horizontal' | 'vertical';
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export interface StepperDefaultProps {
  cls: (...args: ClassValue[]) => string;
  steps: Step[];
  active: number;
  ariaLabel: string;
  className: string;
  id?: string;
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'top' | 'bottom' | 'left' | 'right';
}

export type StepperStepState = 'active' | 'complete' | 'pending';

export interface StepperState {
  ariaLabel: string | undefined;
  id: string;
  labelPosition: StepperDefaultProps['labelPosition'];
}

export interface StepperMediator {
  getStepState: (index: number) => StepperStepState;
  id: string;
  state: StepperState;
  useBeforeUnmount: () => void;
}
