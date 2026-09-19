import { noop } from '@pastweb/tools';
import type { LinkDefaultProps } from './types';

export const DEFAULT_PROPS = {
  href: '#',
  className: '',
  disabled: false,
  target: '_self' as const,
  onClick: noop,
} satisfies Partial<LinkDefaultProps>;
