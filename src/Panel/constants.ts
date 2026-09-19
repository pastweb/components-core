import { noop } from '@pastweb/tools';
import type { PanelDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<PanelDefaultProps> = {
  ariaLabel: '',
  border: true,
  borderRadius: true,
  className: '',
  title: '',
  closeButton: true,
  closeLabel: 'Close panel',
  maximizeButton: false,
  maximizeLabel: 'Maximize panel',
  minimizeButton: false,
  minimizeLabel: 'Minimize panel',
  headingLevel: 2 as const,
  rtl: false,
  onClose: noop,
  onMaximize: noop,
  onMinimize: noop,
  contentPadding: 0,
};
