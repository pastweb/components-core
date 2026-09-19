import { noop } from '@pastweb/tools';
import type { NotificationDefaultProps } from './types';

export const DEFAULT_PROPS = {
  ariaLabel: '',
  className: '',
  rtl: false,
  closeButton: true,
  closeLabel: 'Close notification',
  onClose: noop,
} satisfies Partial<NotificationDefaultProps>;
