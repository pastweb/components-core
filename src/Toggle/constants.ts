import { noop } from '@pastweb/tools';
import type { ToggleDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<ToggleDefaultProps> = {
  ariaLabel: 'Toggle',
  className: '',
  label: '',
  labelPlacement: 'top-start',
  onChange: noop,
  tabIndex: 0,
};
