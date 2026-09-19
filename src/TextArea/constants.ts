import { noop } from '@pastweb/tools';
import type { TextAreaDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<TextAreaDefaultProps> = {
  ariaLabel: 'TextArea',
  className: '',
  disabled: false,
  label: '',
  labelPlacement: 'top-start',
  loading: false,
  onChange: noop,
  placeholder: '',
  readOnly: false,
  required: false,
  resizeable: false,
  tabIndex: 0,
  value: '',
};
