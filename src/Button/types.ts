import type { ClassValue } from '@pastweb/tools';

export interface ButtonProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
  tabIndex?: number;
}

export interface ButtonDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  onClick: (event: MouseEvent) => void;
  disabled: boolean;
  tabIndex: number;
}
