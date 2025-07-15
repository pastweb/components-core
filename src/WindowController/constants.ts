import { noop } from '@pastweb/tools';

export enum MODE {
  modal = 'modal',
  floating = 'floating',
};

export const DEFAULT_PROPS = {
  mode: MODE.modal,
  resizable: false,
  moveCursor: false,
  resizeCursor: true,
  animLeaveTime: 350,
  closeOnBackdropClick: true,
  onClose: noop,
  onKeyDown: noop,
};

export const INITIAL_STATE = { animationClass: 'windowEnter' };
