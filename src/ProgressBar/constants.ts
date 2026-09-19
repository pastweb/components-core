import type { ProgressBarDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<ProgressBarDefaultProps> = {
  ariaLabel: 'Progress',
  className: '',
  label: '%',
  size: 100,
  type: 'linear' as const,
};
