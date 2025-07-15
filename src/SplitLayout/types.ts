import type { ClassValue } from '@pastweb/tools';

export interface SplitLayoutProps {
  cls: (...args: ClassValue[]) => string;
  direction?: 'horizontal' | 'vertical' | string;
  sizes?: number[];
  onSizesChange?: (sizes: number[]) => void;
}

export interface SplitLayoutDefaultProps {
  cls: (...args: ClassValue[]) => string;
  direction: 'horizontal' | 'vertical';
  sizes: number[];
  onSizesChange: (sizes: (number | null)[]) => void;
}

export interface SplitLayoutMediator {
  onMounted: (containerElement: HTMLElement) => void;
  onUnmounted: () => void;
  onMouseDown: (e: any, index: number) => void;
};
