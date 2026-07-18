import type { ClassValue } from '@pastweb/tools';

export interface SelectItemProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
  value?: any;
  onClick?: () => void;
  onKeyDown?: (e: any) => void;
  tabIndex?: number;
};

export interface SelectItemDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  disabled: boolean;
  value?: any;
  onClick: () => void;
  onKeyDown: (e: any) => void;
  tabIndex: number;
};
