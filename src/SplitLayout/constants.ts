import { noop } from '@pastweb/tools';
import type { SplitLayoutDefaultProps } from './types';

export const SPLIT_LAYOUT_CONTEXT_KEY = '$$SplitLayoutContextKey';

export const DEFAULT_PROPS: Partial<SplitLayoutDefaultProps> = {
  ariaLabel: 'Resizable panels',
  className: '',
  disabled: false,
  keyboardStep: 2,
  minSize: 10,
  orientation: 'horizontal' as const,
  sizes: [],
  onSizesChange: noop,
};
