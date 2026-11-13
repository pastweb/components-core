import { noop } from '@pastweb/tools';
import type { InputDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<InputDefaultProps> = {
  ariaLabel: 'Input',
  type: 'text',
  tabIndex: 0,
  className: '',
  placeholder: '',
  label: '',
  onKeyDown: noop,
  onChange: noop,
  labelPlacement: 'top-start',
  incrementTitle: 'Increment',
  decrementTitle: 'Decrement',
};
