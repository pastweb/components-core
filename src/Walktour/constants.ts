import type { WalktourDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<WalktourDefaultProps> = {
  initialStepIndex: 0,
  className: '',
  zIndex: 900,
  maskPadding: 8,
  maskRadius: 6,
  offset: 12,
  placement: 'bottom',
  disableMask: false,
  disableMaskInteraction: false,
  closeOnMaskClick: false,
  closeOnEscape: true,
  scrollIntoView: true,
  nextLabel: 'Next',
  previousLabel: 'Back',
  closeLabel: 'Skip',
};
