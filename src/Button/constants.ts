import { noop } from '@pastweb/tools';
import type { ButtonDefaultProps } from './types';

export const DEFAULT_PROPS = {
  className: '',
  disabled: false,
  loading: false,
  onClick: noop,
  tabIndex: 0,
  type: 'button',
} satisfies Partial<ButtonDefaultProps>;
