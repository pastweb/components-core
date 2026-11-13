import type { AccordionDefaultProps } from './types';

export const ACCORDION_CONTEXT_KEY = '$$AccordionContext';

export const DEFAULT_PROPS: Partial<AccordionDefaultProps> = {
  ariaLabel: 'Accordion',
  className: '',
  transitionDuration: 500,
};
