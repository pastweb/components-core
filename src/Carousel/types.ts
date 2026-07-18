import type { ClassValue } from '@pastweb/tools';

export interface CarouselProps {
  cls: (...args: ClassValue[]) => string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  disabled?: boolean;
  showCommands?: boolean;
  current?: number;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
};

export interface CarouselDefaultProps {
  cls: (...args: ClassValue[]) => string;
  autoPlay: boolean;
  autoPlayInterval: number;
  className: string;
  disabled: boolean;
  showCommands: boolean;
  current: number;
  prevAriaLabel: string;
  nextAriaLabel: string;
};

export interface CarouselState {
  current: number;
};

export interface CarouselMediator {
  state: CarouselState;
  prev: () => void;
  next: () => void;
  registerItem: () => number;
};

export type CarouselContext = CarouselMediator;
