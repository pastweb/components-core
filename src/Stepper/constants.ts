import { noop } from '@pastweb/tools';
import type { StepDefaultProps, StepperDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<StepperDefaultProps> = {
  active: 1,
  ariaLabel: 'Progress',
  className: '',
  orientation: 'horizontal',
  labelPosition: 'top',
};

export const DEFAULT_STEP_PROPS: Partial<StepDefaultProps> = {
  className: '',
  label: '',
  description: '',
  disabled: false,
  onClick: noop,
};
