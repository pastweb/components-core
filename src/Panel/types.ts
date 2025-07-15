import type { ClassValue } from '@pastweb/tools';

export interface PanelProps {
  cls: (...args: ClassValue[]) => string;
  header?: any;
  className?: string;
  title?: string;
  border?: boolean;
  borderRadius?: boolean;
  onClose?: () => void;
  childProps?: Record<string, any>;
  closeButton?: boolean;
  contentPadding?: number | string;
  footer?: any;
  rtl?: boolean;
};

export interface PanelDefaultProps {
  cls: (...args: ClassValue[]) => string;
  header?: any;
  className: string;
  title: string;
  border: boolean;
  borderRadius: boolean;
  onClose: () => void;
  childProps: Record<string, any>;
  closeButton: boolean;
  contentPadding: number | string;
  footer?: any;
  rtl: boolean;
};

export type ParentPanel<T> = {
  props: PanelDefaultProps,
  ctx: T,
};
