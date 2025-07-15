import type { ClassValue } from '@pastweb/tools';

export interface NotificationProps {
  cls: (...args: ClassValue[]) => string;
  onClose?: () => void;
  className?: string,
  rtl?: boolean;
  title?: string,
  header?: any,
  content?: any,
  footer?: any
};

export interface NotificationDefaultProps {
  cls: (...args: ClassValue[]) => string;
  onClose?: () => void;
  className: string,
  rtl: boolean;
  title?: string,
  header?: any,
  content?: any,
  footer?: any
};
