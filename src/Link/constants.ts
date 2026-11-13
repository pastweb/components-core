import { noop } from '@pastweb/tools';
import type { LinkDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<LinkDefaultProps> = {
  href: '#',
  className: '',
  target: '_self' as const,
  onClick: noop,
};
