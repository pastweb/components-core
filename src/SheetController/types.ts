import type { ClassValue, Portal } from '@pastweb/tools';

export type CloseOptions = { id?: string, isConfirmed?: boolean };

export interface SheetControllerProps {
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
};

export interface SheetControllerDefaultProps {
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
};

export interface SheetControllerState {
  isOpen: boolean;
};

export type SheetContext = {
  id: string;
  props: SheetControllerDefaultProps;
  close: (closeOptions?: CloseOptions) => void;
  setConfirm: (fn: () => void) => void;
  update: (props: Record<string, any>) => boolean;
};

export interface SheetControllerMediator {
  state: SheetControllerState;
  getContext: () => SheetContext;
  onMounted: (sheetElement: HTMLElement) => void;
  onBackdropClick: () => void;
  onKeyDown: (e: any) => void;
}
