import type { AccordionDefaultProps } from './types';

export const ACCORDION_CONTEXT_KEY = '$$AccordionContext';

export const DEFAULT_PROPS = {
  ariaLabel: 'Accordion',
  className: '',
  disabled: false,
  rtl: false,
  transitionDuration: 500,
} satisfies Partial<AccordionDefaultProps>;
