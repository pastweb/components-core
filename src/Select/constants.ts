import { noop } from '@pastweb/tools';

export const SELECT_CONTEXT_KEY = '$$SelectContext';

export const DEFAULT_PROPS = {
  className: '',
  onChange: noop,
  tabIndex: 0,
  labelPlacement: 'top-start',
  closeOnSelect: true,
  offset: 3,
};
