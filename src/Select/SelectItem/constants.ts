import { noop } from '@pastweb/tools';

export const DEFAULT_SELECT_ITEM_PROPS = {
  className: '',
  disabled: false,
  value: undefined,
  onClick: noop,
  onKeyDown: noop,
  tabIndex: 0,
};
