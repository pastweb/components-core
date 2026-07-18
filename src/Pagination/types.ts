import type { ClassValue } from '@pastweb/tools';

export interface PaginationProps {
  cls: (...args: ClassValue[]) => string;
  total: number;
  current: number;
  onChange?: (page: number) => void;
  className?: string;
  next?: any;
  prev?: any;
};

export interface PaginationDefaultProps {
  cls: (...args: ClassValue[]) => string;
  total: number;
  current: number;
  onChange: (page: number) => void;
  className: string;
  next?: any;
  prev?: any;
}

export interface PaginationState {
  current: number;
  pages: (number | string)[];
};

export interface PaginationMediator {
  state: PaginationState;
  onPageChange: (page: number | string) => void;
  onPrev: () => void;
  onNext: () => void;
}
