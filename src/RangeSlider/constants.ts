import { noop } from '@pastweb/tools';
import type { RangeSliderDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<RangeSliderDefaultProps> = {
  ariaLabel: 'Range value',
  className: '',
  label: '',
  labelPlacement: 'top-start' as const,
  onChange: noop,
  onMouseUp: noop,
};
