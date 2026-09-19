import { noop } from '@pastweb/tools';

export const DEFAULT_PROPS = {
  ariaLabel: 'Checkbox',
  checkChar: '✔',
  className: '',
  disabled: false,
  label: '',
  labelPlacement: 'top-start' as const,
  onChange: noop,
  tabIndex: 0,
  value: false,
};
