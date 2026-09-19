import type { AccordionPanelDefaultProps } from './types';

export const DEFAULT_TRANSITION_DURATION = 500;

export const DEFAULT_ACCORDION_PANEL_PROPS = {
  className: '',
  disabled: false,
  headingLevel: 2 as const,
  isOpen: false,
  landmark: false,
  title: '',
  rtl: false,
  transitionDuration: DEFAULT_TRANSITION_DURATION,
} satisfies Partial<AccordionPanelDefaultProps>;
