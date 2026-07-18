import type { ClassValue } from '@pastweb/tools';

export interface PanelProps {
  cls: (...args: ClassValue[]) => string;
  border?: boolean;
  borderRadius?: boolean;
  className?: string;
  closeButton?: boolean;
  title?: string;
  contentPadding?: number | string;
  onClose?: () => void;
  rtl?: boolean;
};

export interface PanelDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  title: string;
  border: boolean;
  borderRadius: boolean;
  onClose: () => void;
  closeButton: boolean;
  contentPadding: number | string;
  rtl: boolean;
};

export interface PanelState {
  uid: string;
  titleId?: string;
};

export interface PanelMediator {
  state: PanelState;
  onUnmount: () => void;
};
