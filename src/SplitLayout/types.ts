import type { ClassValue } from '@pastweb/tools';

export type SplitLayoutOrientation = 'horizontal' | 'vertical';

export interface SplitLayoutProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  keyboardStep?: number;
  minSize?: number;
  orientation?: SplitLayoutOrientation;
  sizes?: number[];
  onSizesChange?: (sizes: number[]) => void;
}

export interface SplitLayoutDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  disabled: boolean;
  keyboardStep: number;
  minSize: number;
  orientation: SplitLayoutOrientation;
  sizes: number[];
  onSizesChange: (sizes: number[]) => void;
}

export interface SplitLayoutState {
  activeSeparator: number | null;
  ariaLabel: string | undefined;
  isDisabled: true | undefined;
  itemCount: number;
  sizes: number[];
}

export interface SplitLayoutKeyEvent {
  key: string;
  preventDefault?: () => void;
}

export interface SplitLayoutSeparatorValue {
  max: number;
  min: number;
  now: number;
}

export interface SplitLayoutContext {
  cls: (...args: ClassValue[]) => string;
  readonly disabled: boolean;
  readonly itemCount: number;
  readonly minSize: number;
  readonly orientation: SplitLayoutOrientation;
  getSize: (index: number) => number;
  getSeparatorValue: (index: number) => SplitLayoutSeparatorValue;
  onResize: (delta: number) => void;
  onResizeEnd: () => void;
  onResizeStart: (index: number) => void;
  onSeparatorKeyDown: (event: SplitLayoutKeyEvent, index: number) => void;
}

export interface SplitLayoutMediator extends SplitLayoutContext {
  state: SplitLayoutState;
  getContext: () => SplitLayoutContext;
  setItemCount: (count: number) => void;
  useBeforeUnmount: () => void;
}
