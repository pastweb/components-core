import type { ClassValue } from '@pastweb/tools';

export interface NotificationProps {
  cls: (...args: ClassValue[]) => string;
  closeButton?: boolean;
  onClose?: () => void;
  className?: string,
  rtl?: boolean;
  title?: string,
};

export interface NotificationDefaultProps {
  cls: (...args: ClassValue[]) => string;
  closeButton: boolean;
  onClose: () => void;
  className: string,
  rtl: boolean;
  title?: string,
};
