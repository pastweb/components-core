import type { ClassValue } from '@pastweb/tools';

export interface NotificationProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  closeButton?: boolean;
  closeLabel?: string;
  onClose?: () => void;
  className?: string;
  rtl?: boolean;
  title?: string;
}

export interface NotificationDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  closeButton: boolean;
  closeLabel: string;
  onClose: () => void;
  className: string;
  rtl: boolean;
  title?: string;
}

export interface NotificationState {
  ariaLabel: string | undefined;
  role: 'region' | undefined;
}

export interface NotificationMediator {
  onClose: () => void;
  state: NotificationState;
}
