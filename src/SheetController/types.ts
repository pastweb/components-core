import type { ClassValue, Portal } from '@pastweb/tools';

export type CloseOptions = { id?: string; isConfirmed?: boolean };
export type SheetDirection = 'left' | 'right' | 'up' | 'down';

export interface SheetEvent {
  detail?: { entryId?: string };
  type?: string;
}

export interface SheetKeyboardEvent {
  defaultPrevented?: boolean;
  key?: string;
  shiftKey?: boolean;
  preventDefault?: () => void;
}

export interface SheetEventTarget {
  addEventListener?: (type: string, listener: any) => void;
  removeEventListener?: (type: string, listener: any) => void;
}

export interface SheetFocusableReference {
  contains?: (node: Node | null) => boolean;
  focus?: () => void;
  querySelectorAll?: (selectors: string) => ArrayLike<SheetFocusableReference>;
}

export interface SheetControllerVars {
  sheet?: SheetFocusableReference;
  previousFocus?: SheetFocusableReference;
  host?: SheetEventTarget;
  closeTimer?: ReturnType<typeof setTimeout>;
  confirmClose: (() => void) | null;
  finalized: boolean;
}

export interface SheetControllerProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  animationTime?: number;
  backdrop?: boolean;
  bottom?: number | string;
  className?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  direction?: SheetDirection;
  entryId?: string;
  height?: number | string;
  id?: string;
  left?: number | string;
  modal?: boolean;
  portal?: Portal;
  portalElement?: SheetEventTarget;
  right?: number | string;
  top?: number | string;
  width?: number | string;
  onClose?: () => void;
  onKeyDown?: (event: SheetKeyboardEvent) => void;
}

export interface SheetControllerDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  animationTime: number;
  backdrop: boolean;
  bottom?: number | string;
  className: string;
  closeOnBackdropClick: boolean;
  closeOnEscape: boolean;
  direction: SheetDirection;
  entryId?: string;
  height?: number | string;
  id?: string;
  left?: number | string;
  modal: boolean;
  portal?: Portal;
  portalElement?: SheetEventTarget;
  right?: number | string;
  top?: number | string;
  width?: number | string;
  onClose: () => void;
  onKeyDown: (event: SheetKeyboardEvent) => void;
}

export interface SheetControllerState {
  ariaLabel: string | undefined;
  id: string;
  isClosed: boolean;
  isClosing: boolean;
  isOpen: boolean;
}

export type SheetContext = {
  id: string;
  props: SheetControllerDefaultProps;
  close: (closeOptions?: CloseOptions) => void;
  setConfirm: (fn: () => void) => void;
  update: (props: Record<string, any>) => boolean;
};

export interface SheetControllerMediator {
  id: string;
  state: SheetControllerState;
  getContext: () => SheetContext;
  onBackdrop: () => void;
  onClose: (closeOptions?: CloseOptions) => void;
  onKeyDown: (event: SheetKeyboardEvent) => void;
  onTransitionEnd: () => void;
  useBeforeUnmount: () => void;
  useMounted: (sheet: SheetFocusableReference, host?: SheetEventTarget) => void;
}
