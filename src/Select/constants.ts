import { noop } from '@pastweb/tools';
import type { SelectDefaultProps } from './types';

export const SELECT_CONTEXT_KEY = '$$SelectContext';

export const DEFAULT_PROPS: Partial<SelectDefaultProps> = {
  ariaLabel: 'Select an option',
  className: '',
  label: '',
  onChange: noop,
  placeholder: 'Select',
  tabIndex: 0,
  labelPlacement: 'top-start' as const,
  closeOnSelect: true,
  hideOnClick: true,
  offset: 3,
};
