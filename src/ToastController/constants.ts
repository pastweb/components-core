import { noop } from '@pastweb/tools';
import type { Animation } from '../types';

export enum PLACEMENT {
  topRight = 'top-right',
  topCenter = 'top-center',
  topLeft = 'top-left',
  bottomRight = 'bottom-right',
  bottomCenter = 'bottom-center',
  bottomLeft = 'bottom-left',
}

export const JUSTIFY: Record<string, string> = {
  right: 'flex-end',
  center: 'center',
  left: 'flex-start'
};

export const ANIMATIONS: Record<string, Animation> = {
  slide: {
    name: 'slide',
    in: {
      animationDuration: 0.5,
      animationTimingFunction: 'ease'
    },
    out: {
      animationDuration: 0.5,
      animationTimingFunction: 'ease'
    },
  },
  bounce: {
    name: 'bounce',
    in: {
      animationDuration: 0.5,
      animationTimingFunction: 'ease'
    },
    out: {
      animationDuration: 0.5,
      animationTimingFunction: 'ease'
    },
  },
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
      animationTimingFunction: 'ease-in',
    },
    out: {
      animationDelay: 0.1,
      animationDuration: 0.5,
      animationTimingFunction: 'ease-out',
    },
  },
  fade: {
    name: 'fade',
    in: {
      animationDuration: 0.5,
      animationTimingFunction: 'ease',
    },
    out: {
      animationDuration: 0.5,
      animationTimingFunction: 'ease'
    },
  }
};

export const DEFAULT_PROPS = {
  ariaLabel: '',
  placement: PLACEMENT.topRight,
  padding: 15,
  delay: 5,
  timeUpdate: 10,
  animation: ANIMATIONS.slide,
  onClose: noop,
  onDestroy: noop,
  onKeyDown: noop,
};

export const INTERVAL_MS = 10;
export const TOAST_REMOVED_EVENT = 'TOAST_REMOVED_EVENT';
export const TOAST_CONTEXT_KEY = '$$ToastContext';
