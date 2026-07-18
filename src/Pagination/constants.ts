import { noop } from '@pastweb/tools';

export const DOTS_INITIAL = '...';
export const DOTS_LEFT = '... ';
export const DOTS_RIGHT = ' ...';

export const DEFAULT_PROPS = {
  className: '',
  prev: '◄',
  next: '►',
  onChange: noop,
};
