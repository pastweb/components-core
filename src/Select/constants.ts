import { noop } from '@pastweb/tools';

export const DEFAULT_PROPS = {
  className: '',
  onChange: noop,
  isLoading: false,
  tabIndex: 0,
  labelPosition: 'top',
  placeholder: 'Select',
  closeOnSelect: true,
};
