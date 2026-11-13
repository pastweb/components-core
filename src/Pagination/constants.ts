import { noop } from '@pastweb/tools';
import type { PaginationDefaultProps } from './types';

export const DOTS_INITIAL = '...';
export const DOTS_LEFT = '... ';
export const DOTS_RIGHT = ' ...';

export const DEFAULT_PROPS: Partial<PaginationDefaultProps> = {
  ariaLabel: 'Pagination',
  className: '',
  prev: '◄',
  next: '►',
  onChange: noop,
  nextAriaLabel: 'Next page',
  prevAriaLabel: 'Previous page',
  pageAriaLabel: (page: number) => `Page ${page}`,
  jumpBackAriaLabel: 'Jump backward through pages',
  jumpForwardAriaLabel: 'Jump forward through pages',
};
