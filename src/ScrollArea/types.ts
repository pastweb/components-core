import type { ClassValue } from '@pastweb/tools';

export interface ScrollAreaProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  id?: string;
  hideX?: boolean;
  scrollRight?: boolean;
  hideY?: boolean;
  scrollBottom?: boolean;
  contentPadding?: number | string;
  tabIndex?: number;
}

export interface ScrollAreaDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  id?: string;
  hideX: boolean;
  scrollRight: boolean;
  hideY: boolean;
  scrollBottom: boolean;
  contentPadding?: number | string;
  tabIndex: number;
}

export interface ScrollAreaState {
  ariaLabel: string | undefined;
}

export interface ScrollAreaAlignment {
  horizontal: 'start' | 'end';
  vertical: 'start' | 'end';
}

export interface ScrollAreaContentStyle {
  padding?: number | string;
}

export interface ScrollAreaMediator {
  getContentStyle: () => ScrollAreaContentStyle;
  getScrollAlignment: () => ScrollAreaAlignment;
  state: ScrollAreaState;
}
