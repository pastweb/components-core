import { noop } from '@pastweb/tools';

export const SPLIT_LAYOUT_CONTEXT_KEY = '$$SplitLayoutContextKey';

export const DEFAULT_PROPS = {
  orientation: 'horizontal',
  sizes: [],
  onSizesChange: noop,
};
