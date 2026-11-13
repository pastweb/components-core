import { noop } from '@pastweb/tools';
import type { TextAreaDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<TextAreaDefaultProps> = {
  ariaLabel: 'TextArea',
  className: '',
  label: '',
  labelPlacement: 'top-start',
  onChange: noop,
  placeholder: '',
  tabIndex: 0,
  value: '',
};
