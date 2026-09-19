import { noop } from '@pastweb/tools';
import type { TabDefaultProps } from './types';

export const DEFAULT_TAB_PROPS: Partial<TabDefaultProps> = {
  className: '',
  disabled: false,
  onClick: noop,
};
