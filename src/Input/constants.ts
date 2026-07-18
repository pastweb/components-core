import { noop } from '@pastweb/tools';

export const DEFAULT_PROPS = {
  type: 'text',
  tabIndex: 0,
  className: '',
  placeholder: '',
  disabled: false,
  onClick: noop,
  onKeyDown: noop,
  onChange: noop,
  labelPlacement: 'top-start',
  incrementTitle: 'Increment',
  decrementTitle: 'Decrement',
};
