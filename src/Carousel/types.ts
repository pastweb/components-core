import type { ClassValue } from '@pastweb/tools';

export interface CarouselKeyEvent {
  key: string;
  preventDefault?: () => void;
}

export interface CarouselProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  showCommands?: boolean;
  current?: number;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  onCurrentChange?: (current: number) => void;
};

export interface CarouselDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  disabled: boolean;
  id?: string;
  showCommands: boolean;
  current: number;
  prevAriaLabel: string;
  nextAriaLabel: string;
  onCurrentChange?: (current: number) => void;
};

export interface CarouselState {
  ariaLabel: string | undefined;
  ariaLive: 'off' | 'polite';
  ariaRoleDescription: 'carousel' | undefined;
  className: string;
  current: number;
  isDisabled: true | undefined;
  itemsCount: number;
  nextAriaLabel: string;
  prevAriaLabel: string;
  role: 'region' | undefined;
  transform: string;
};

export interface CarouselMediator {
  id: string;
  state: CarouselState;
  getContext: () => CarouselContext;
  prev: () => void;
  next: () => void;
  registerItem: () => number;
  onKeyDown: (event: CarouselKeyEvent) => void;
  useBeforeUnmount: () => void;
};

export type CarouselContextMethods = Pick<
  CarouselMediator,
  'prev' | 'next' | 'registerItem'
>;

export interface CarouselContext extends CarouselContextMethods {
  readonly current: number;
  readonly isDisabled: true | undefined;
  readonly itemsCount: number;
};