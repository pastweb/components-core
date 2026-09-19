import type { ClassValue } from '@pastweb/tools';

export interface PaginationProps {
  cls: (...args: ClassValue[]) => string;
  total: number;
  current: number;
  ariaLabel?: string;
  disabled?: boolean;
  onChange?: (page: number) => void;
  className?: string;
  next?: unknown;
  prev?: unknown;
  nextAriaLabel?: string;
  prevAriaLabel?: string;
  pageAriaLabel?: (page: number) => string;
  jumpBackAriaLabel?: string;
  jumpForwardAriaLabel?: string;
}

export interface PaginationDefaultProps {
  cls: (...args: ClassValue[]) => string;
  total: number;
  current: number;
  ariaLabel: string;
  disabled: boolean;
  onChange: (page: number) => void;
  className: string;
  next?: unknown;
  prev?: unknown;
  nextAriaLabel: string;
  prevAriaLabel: string;
  pageAriaLabel: (page: number) => string;
  jumpBackAriaLabel: string;
  jumpForwardAriaLabel: string;
}

export type PaginationItem = number | '...' | '... ' | ' ...';

export interface PaginationState {
  ariaLabel: string | undefined;
  current: number;
  isDisabled: true | undefined;
  isNextDisabled: true | undefined;
  isPrevDisabled: true | undefined;
  pages: PaginationItem[];
}

export interface PaginationMediator {
  onNext: () => void;
  onPageChange: (page: PaginationItem) => void;
  onPrev: () => void;
  state: PaginationState;
}
