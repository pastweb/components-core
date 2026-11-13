import { noop } from '@pastweb/tools';

export const DEFAULT_PROPS = {
  ariaLabel: 'Checkbox',
  checkChar: '✔',
  className: '',
  label: '',
  labelPlacement: 'top-start' as const,
  onChange: noop,
  tabIndex: 0,
};
