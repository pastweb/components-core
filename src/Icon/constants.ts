import type { IconDefaultProps } from './types';

export const DEFAULT_PROPS = {
  ariaLabel: '',
  className: '',
  src: '',
  name: '',
  collection: {},
  apiUrl: 'https://api.iconify.design',
} satisfies Partial<IconDefaultProps>;
