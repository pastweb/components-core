import { noop } from '@pastweb/tools';
import type { SelectItemDefaultProps } from './types';

export const DEFAULT_SELECT_ITEM_PROPS: Partial<SelectItemDefaultProps> = {
  className: '',
  disabled: false,
  value: undefined,
  onClick: noop,
  onKeyDown: noop,
  tabIndex: 0,
};
