import type { ClassValue } from '@pastweb/tools';

export interface TagProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
};

export interface TagDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
};
