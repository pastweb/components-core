import { noop } from '@pastweb/tools';
import type { SheetControllerDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<SheetControllerDefaultProps> = {
  ariaLabel: 'Sheet',
  animationTime: 400,
  backdrop: false,
  className: '',
  direction: 'left',
  onClose: noop,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  modal: false,
  onKeyDown: noop,
};

export const SHEET_CONTEXT_KEY = '$$SheetContext';
