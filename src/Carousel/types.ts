import type { ClassValue } from '@pastweb/tools';

export interface CarouselItem {
  content: any;
  name: string;
};

export interface CarouselProps {
  cls: (...args: ClassValue[]) => string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  commands?: boolean;
  current?: number;
  items: CarouselItem[];
};

export interface CarouselDefaultProps {
  cls: (...args: ClassValue[]) => string;
  autoPlay: boolean;
  autoPlayInterval: number;
  className: string;
  commands: boolean;
  current: number;
  items: CarouselItem[];
};

export interface CarouselState {
  current: number;
};

export interface CarouselMediator {
  state: CarouselState;
  prev: () => void;
  next: () => void;
}
