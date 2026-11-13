import { noop } from '@pastweb/tools';
import type { RadioDefaultOption, RadioDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<RadioDefaultProps> = {
  ariaLabel: 'Radio options',
  className: '',
  label: '',
  orientation: 'horizontal' as const,
  onChange: noop,
  labelPlacement: 'top-start' as const,
  value: '',
};

export const DEFAULT_RADIO_OPTIONS: Partial<RadioDefaultOption> = {
  labelPosition: 'right' as const,
};
