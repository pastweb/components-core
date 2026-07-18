import type { ClassValue, Portal } from '@pastweb/tools';
import type { Animation } from '../types';

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
  animation?: Animation;
  /** If is true on backdrop click will close the modal. */
  closeOnBackdropClick?: boolean;
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
  animation: Animation;
  /** If is true on backdrop click will close the modal. */
  closeOnBackdropClick: boolean;
  /** function calld on modal close */
  onClose: () => void;
  /** function calld on key down */
  onKeyDown: (e: any) => void;
}

export type WindowContext = {
  id: string;
  props: WindowControllerDefaultProps;
  close: (closeOptions?: CloseOptions) => void;
  setConfirm: (fn: (() => void)) => void;
  update: (props: Record<string, any>) => boolean;
  bringToFront: () => void;
};

export type WindowControllerState = {
  isOpen: boolean;
};

export interface WindowControllerMediator {
  state: WindowControllerState;
  getContext: () => WindowContext;
  onMounted: (windowElement: HTMLElement) => void;
  onBackdropClick: () => void;
  onKeyDown: (e: any) => void;
}
