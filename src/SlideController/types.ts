import type { ClassValue, Portal } from '@pastweb/tools';

export type CloseOptions = { id?: string, isConfirmed?: boolean };

export interface SlideControllerProps {
  cls: (...args: ClassValue[]) => string;
  portalElement?: HTMLElement;
  portal?: Portal,
  entryId?: string;
  backdrop?: boolean;
  direction?: string;
  height?: number | string;
  width?: number | string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  animationTime?: number;
  closeOnBackdropClick?: boolean;
  onClose?: () => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  childProps?: Record<string, any>;
};

export interface SlideControllerDefaultProps {
  cls: (...args: ClassValue[]) => string;
  portalElement: HTMLElement;
  portal: Portal,
  entryId: string;
  backdrop: boolean;
  direction: string;
  height?: number | string;
  width?: number | string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  animationTime: number;
  closeOnBackdropClick: boolean;
  onClose: () => void,
  onKeyDown: (event: KeyboardEvent) => void,
  childProps: Record<string, any>;
};

export interface SlideControllerState {
  isOpen: boolean;
};

export type ParentSlide = {
  id: string;
  props: Record<string, any>;
  close: (closeOptions?: CloseOptions) => void;
  setConfirm: (fn: () => void) => void;
  update: (props: Record<string, any>) => boolean;
  inject: Record<string, any>;
};

export interface SlideControllerMediator {
  state: SlideControllerState;
  getParentSlide: (inject?: Record<string, any>) => ParentSlide;
  onMounted: (slideElement: HTMLElement) => void;
  onBackdropClick: () => void;
  onKeyDown: (e: any) => void;
}
