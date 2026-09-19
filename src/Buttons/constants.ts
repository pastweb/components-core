import type { ButtonsDefaultProps } from './types';

export const DEFAULT_PROPS = {
  ariaLabel: 'Button group',
  className: '',
  disabled: false,
} satisfies Partial<ButtonsDefaultProps>;

export const BUTTONS_CONTEXT_KEY = '$$ButtonsContext';

