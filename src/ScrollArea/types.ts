import type { ClassValue } from '@pastweb/tools';

export interface ScrollAreaProps {
  cls: (...args: ClassValue[]) => string;
  hideX?: boolean;
  scrollRight?: boolean;
  hideY?: boolean;
  scrollBottom?: boolean;
  contentPadding?: number | string;
};
