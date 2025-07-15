import type { ClassValue } from '@pastweb/tools';

export interface SpinnerProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
};

export interface SpinnerDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
};
