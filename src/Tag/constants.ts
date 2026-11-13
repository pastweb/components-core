import { noop } from '@pastweb/tools';
import type { TagDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<TagDefaultProps> = {
  ariaLabel: '',
  className: '',
  closeLabel: 'Close tag',
  onClose: noop,
};
