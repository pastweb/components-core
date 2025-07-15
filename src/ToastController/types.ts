import type { ClassValue, Portal } from '@pastweb/tools';

export type CloseOptions = { id?: string, isConfirmed?: boolean };

export interface ToastControllerProps {
  cls: (...args: ClassValue[]) => string;
  portal?: Portal;
  portalElement?: HTMLElement;
  entryId?: string;

  position?: string;
  padding?: number;
  delay?: number;
  timeUpdate?: number;
  animation?: string;
  animationDuration?: number;

  closeOnEscKey?: boolean;
  pauseTimerOnOver?: boolean;
  resetTimerOnPause?: boolean;
  onClose?: () => void;
  onDestroy?: () => void;
  onKeyDown?: (e: any) => void;
};

export interface ToastControllerDefaultProps {
  cls: (...args: ClassValue[]) => string;
  portal: Portal;
  portalElement: HTMLElement;
  entryId: string;

  position: string;
  padding: number;
  delay: number;
  timeUpdate: number;
  animation: string;
  animationDuration: number;

  closeOnEscKey: boolean;
  pauseTimerOnOver: boolean;
  resetTimerOnPause: boolean;
  onClose: () => void;
  onDestroy: () => void;
  onKeyDown: (e: any) => void;
};

export type ParentToast = {
  toastId: string;
  props: Record<string, any>;
  close: () => void;
  update: (newProps: { [propName: string]: any }) => boolean;
  setConfirm: (fn: () => void) => void;
  setTime: (fn: (percent: number) => void) => void;
  inject: Record<string, any>;
};

export interface ToastControllerState {
  isOpen: boolean;
  x: string;
  y: string;
  top: number;
  bottom: number;
}

export type ToastData = {
  portalElement: HTMLElement;
  toastId: string;
  toastIndex: number;
  time: number;
  timeout: number;
  interval: any;
};

export interface ToastControllerMediator {
  state: ToastControllerState;
  data: ToastData;
  getParentToast: (inject?: Record<string, any>) => ParentToast;
  onMouseOver: () => void;
  onMouseLeave: () => void;
  onMounted: (toastElement: HTMLElement) => void;
  onKeyDown: (e: any) => void;
}
