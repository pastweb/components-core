import type { ClassValue } from '@pastweb/tools';

export interface TabProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
};

export interface TabDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  disabled: boolean;
  onClick: (e: MouseEvent) => void;
};
