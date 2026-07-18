import { noop } from '@pastweb/tools';

export const DEFAULT_PROPS = {
  border: true,
  borderRadius: true,
  className: '',
  title: '',
  closeButton: true,
  rtl: true,
  onClose: noop,
  contentPadding: 0,
};
