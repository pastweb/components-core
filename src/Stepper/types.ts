import type { ClassValue } from '@pastweb/tools';

export interface Step {
  className?: string;
  label?: string;
  description?: string;
  'aria-label'?: string;
  onClick?: () => void;
  content?: any;
};

export interface StepDefaultProps {
  className: string;
  label: string;
  description: string;
  'aria-label'?: string;
  onClick: () => void;
  content?: any;
};

export interface StepperProps {
  cls: (...args: ClassValue[]) => string;
  steps: Step[];
  active: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
};

export interface StepperDefaultProps {
  cls: (...args: ClassValue[]) => string;
  steps: Step[];
  active: number;
  className: string;
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'top' | 'bottom' | 'left' | 'right';
};
