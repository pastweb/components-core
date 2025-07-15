import type { ClassValue, Portal } from '@pastweb/tools';

export type CloseOptions = { id?: string, isConfirmed?: boolean };

export interface WindowControllerProps {
  cls: (...args: ClassValue[]) => string;
  portalElement?: HTMLElement;
  entryId?: string;
  portal?: Portal;
  mode?: 'modal' | 'floating';
  moveCursor?: boolean;
  resizable?: boolean;
  resizeCursor?: boolean;
  width?: number;
  height?: number;
  /** If is true on backdrop click will close the modal. */
  closeOnBackdropClick?: boolean;
  /** Time in cent/seconds of leave animation to wait before to destroy the window. */
  animLeaveTime?: number;
  /** function calld on modal close */
  onClose?: () => void;
  /** function calld on key down */
  onKeyDown?: (event: KeyboardEvent) => void;
};

export interface WindowControllerDefaultProps {
  cls: (...args: ClassValue[]) => string;
  portalElement: HTMLElement;
  entryId: string;
  portal: Portal;
  mode: 'modal' | 'floating';
  moveCursor: boolean;
  resizable: boolean;
  resizeCursor: boolean;
  width?: number;
  height?: number;
  /** If is true on backdrop click will close the modal. */
  closeOnBackdropClick: boolean;
  /** Time in cent/seconds of leave animation to wait before to destroy the window. */
  animLeaveTime: number;
  /** function calld on modal close */
  onClose: () => void;
  /** function calld on key down */
  onKeyDown: (e: any) => void;
}

export type ParentWindow = {
  id: string;
  props: Record<string, any>;
  close: (closeOptions?: CloseOptions) => void;
  setConfirm: (fn: (() => void)) => void;
  update: (props: Record<string, any>) => boolean;
  bringToFront: () => void;
  inject: Record<string, any>;
};

export type WindowControllerState = {
  animationClass: string;
};

export interface WindowControllerMediator {
  state: WindowControllerState;
  getParentWindow: (inject?: Record<string, any>) => ParentWindow;
  onMounted: (windowElement: HTMLElement) => void;
  onBackdropClick: () => void;
  onKeyDown: (e: any) => void;
}
