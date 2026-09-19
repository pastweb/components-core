import type { ClassValue } from '@pastweb/tools';

export interface TagProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  closeButton?: boolean;
  closeLabel?: string;
  onClose?: () => void;
  rounded?: boolean;
}

export interface TagDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  closeButton: boolean;
  closeLabel: string;
  onClose: () => void;
  rounded: boolean;
}
