import type { ClassValue } from '@pastweb/tools';

export interface ButtonsProps {
  cls: (...args: ClassValue[]) => string;
  type?: string
  ariaLabel?: string;
  className?: string;
};

export interface ButtonsDefaultProps {
  cls: (...args: ClassValue[]) => string;
  type: string
  ariaLabel: string;
  className: string;
};
