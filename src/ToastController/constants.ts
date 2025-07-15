import { noop } from '@pastweb/tools';

export enum POSITION {
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

export enum ANIMATION {
  bounce = 'bounce',
  fade = 'fade',
  flip = 'flip',
  slide = 'slide',
  zoom = 'zoom',
}

export const DEFAULT_PROPS = {
  position: POSITION.topRight,
  padding: 15,
  delay: 5,
  timeUpdate: 10,
  animation: ANIMATION.slide,
  animationDuration: 500,
  closeOnEscKey: true,
  pauseTimerOnOver: true,
  resetTimerOnPause: false,
  onClose: noop,
  onDestroy: noop,
  onKeyDown: noop,
};

export const INTERVAL_MS = 10;
export const TOAST_REMOVED_EVENT = 'TOAST_REMOVED_EVENT';
