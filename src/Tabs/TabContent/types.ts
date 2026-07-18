import type { ClassValue } from '@pastweb/tools';

export interface TabContentProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
};

export interface TabContentDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
};
