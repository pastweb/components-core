import type { AccordionPanelDefaultProps } from './types';

export const DEFAULT_TRANSITION_DURATION = 500;

export const DEFAULT_ACCORDION_PANEL_PROPS: Partial<AccordionPanelDefaultProps> = {
  className: '',
  headingLevel: 2 as const,
  title: '',
  transitionDuration: DEFAULT_TRANSITION_DURATION,
};
