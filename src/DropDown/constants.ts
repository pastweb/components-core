import { noop } from '@pastweb/tools';

export const DEFAULT_PROPS = {
  className: '',
  placement: 'bottom',
  visibleOn: 'click',
  hideOnClickOut: true,
  position: 'absolute',
  onClick: noop,
  onClickOut: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
};

export const CLICK_OUT_TIME_GAP = 32; // ms
