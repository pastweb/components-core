import { noop } from '@pastweb/tools';

export const DEFAULT_PROPS = {
  tabIndex: 0,
  className: '',
  placeholder: '',
  disabled: false,
  onClick: noop,
  onKeyDown: noop,
  onChange: noop,
  labelPosition: 'top',
  isLoading: false,
};
