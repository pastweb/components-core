import { noop } from '@pastweb/tools';
import type { Animation } from '../types';

export enum MODE {
  modal = 'modal',
  floating = 'floating',
};

export const ANIMATIONS: Record<string, Animation> = {
  zoom: {
    name: 'zoom',
    in: {
      animationDuration: 0.25,
      animationTimingFunction: 'ease',
    },
    out: {
      animationDelay: 0.1,
      animationDuration: 0.25,
      animationTimingFunction: 'ease',
    },
  },
  flip: {
    name: 'flip',
    in: {
      animationDuration: 0.5,
      animationTimingFunction: 'easy-in',
    },
    out: {
      animationDelay: 0.1,
      animationDuration: 0.5,
      animationTimingFunction: 'easy-out',
    },
  },
  fade: {
    name: 'fade',
    in: {
      animationDuration: 0.5,
    },
    out: {
      animationDuration: 0.5,
    },
  }
};

export const DEFAULT_PROPS = {
  mode: MODE.modal,
  animation: ANIMATIONS.zoom,
  resizable: false,
  moveCursor: true,
  resizeCursor: true,
  closeOnBackdropClick: true,
  onClose: noop,
  onKeyDown: noop,
};

export const WINDOW_CONTEXT_KEY = '$$WindowContext';
