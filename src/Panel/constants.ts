import { noop } from '@pastweb/tools';

export const DEFAULT_PROPS = {
  border: true,
  borderRadius: true,
  class: '',
  title: '',
  closeButton: true,
  rtl: false,
  onClose: noop,
  contentPadding: 0,
  childProps: {},
};
