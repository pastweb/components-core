import type { ClassValue } from '@pastweb/tools';

export interface ButtonProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
  tabIndex?: number;
  loadingComponent?: any;
}

export interface ButtonDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  onClick: (event: MouseEvent) => void;
  disabled: boolean;
  tabIndex: number;
  loadingComponent: any;
}
