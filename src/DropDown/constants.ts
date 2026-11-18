import { noop } from '@pastweb/tools';
import type { DropDownDefaultProps } from './types';

export const DROPDOWN_CONTEXT_KEY = 'DropDownContext';

export const DEFAULT_PROPS: Partial<DropDownDefaultProps> = {
  ariaLabel: 'DropDown',
  arrow: true,
  className: '',
  contentClassName: '',
  offset: 2,
  placement: 'bottom',
  visibleOn: 'click',
  visibleTarget: 'element',
  hideOnClick: true,
  hideOnClickOut: true,
  hideOnBlur: true,
  position: 'absolute',
  clickTimeGap: 16,
  onClick: noop,
  onChange: noop,
  onContext: noop,
  onClickOut: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
};
