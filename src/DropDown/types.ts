import type { Placement } from '@floating-ui/dom';
import type { ClassValue } from '@pastweb/tools';

export type { Placement } from '@floating-ui/dom';

export interface DropDownProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
  isVisible?: boolean;
  visibleOn?: 'click' | 'over';
  placement?: Placement;
  header?: any;
  content?: any;
  footer?: any;
  hideOnClickOut?: boolean;
  position?: 'absolute' | 'fixed';
  onClick?: () => void;
  onClickOut?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export interface DropDownDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  disabled?: boolean;
  isVisible?: boolean;
  visibleOn: 'click' | 'over';
  placement: Placement;
  header?: any;
  content?: any;
  footer?: any;
  hideOnClickOut: boolean;
  position: 'absolute' | 'fixed';
  onClick: () => void;
  onClickOut: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export type DropDownState = {
  isVisible: boolean;
};

export type DropDownMediator = {
  state: DropDownState;
  onMounted: (root: HTMLElement, target: HTMLElement, content: HTMLElement, arrow: HTMLElement) => void;
  onUnmount: () => void;
};
