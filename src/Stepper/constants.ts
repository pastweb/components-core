import { noop } from '@pastweb/tools';

export const DEFAULT_PROPS = {
  active: 1,
  className: '',
  orientation: 'horizontal',
  labelPosition: 'bottom',
};

export const DEFAULT_STEP_PROPS = {
  className: '',
  label: '',
  description: '',
  onClick: noop,
};