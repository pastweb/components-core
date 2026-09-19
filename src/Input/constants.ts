import { noop } from '@pastweb/tools';
import type { InputDefaultProps } from './types';

export const DEFAULT_PROPS = {
  ariaLabel: 'Input',
  type: 'text',
  tabIndex: 0,
  className: '',
  placeholder: '',
  disabled: false,
  loading: false,
  required: false,
  label: '',
  onKeyDown: noop,
  onChange: noop,
  labelPlacement: 'top-start',
  incrementTitle: 'Increment',
  decrementTitle: 'Decrement',
} satisfies Partial<InputDefaultProps>;
