import { noop } from '@pastweb/tools';

export const DEFAULT_PROPS = {
  animationTime: 400,
  backdrop: false,
  direction: 'left',
  onClose: noop,
  closeOnBackdropClick: true,
  onKeyDown: noop,
  childProps: {},
};

export const INITIAL_STATE = { isOpen: true };
