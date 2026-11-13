import { noop } from '@pastweb/tools';
import type { ButtonDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<ButtonDefaultProps> = {
  className: '',
  onClick: noop,
  tabIndex: 0,
  type: 'button',
};
