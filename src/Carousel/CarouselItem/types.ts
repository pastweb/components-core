import type { ClassValue } from '@pastweb/tools';

export interface CarouselItemProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
};

export interface CarouselItemDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  disabled: boolean;
};
