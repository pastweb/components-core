import { noop } from '@pastweb/tools';

export const DROPDOWN_CONTEXT_KEY = 'DropDownContext';

export const DEFAULT_PROPS = {
  arrow: true,
  className: '',
  contentClassName: '',
  offset: 2,
  placement: 'bottom',
  visibleOn: 'click',
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
