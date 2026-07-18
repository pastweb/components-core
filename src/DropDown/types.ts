import type { Placement } from '@floating-ui/dom';
import type { ClassValue } from '@pastweb/tools';

export type { AlignedPlacement, Placement, Side } from '@floating-ui/dom';

export interface DropDownProps {
  cls: (...args: ClassValue[]) => string;
  arrow?: boolean;
  className?: string;
  contentClassName?: string;
  offset?: number;
  disabled?: boolean;
  isVisible?: boolean;
  visibleOn?: 'click' | 'over' | 'context';
  placement?: Placement;
  hideOnClickOut?: boolean;
  hideOnBlur?: boolean;
  position?: 'absolute' | 'fixed';
  clickTimeGap?: number; // delay time in ms
  onClick?: () => void;
  onChange?: (isVisible: boolean) => void;
  onContext?: () => void;
  onClickOut?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export interface DropDownDefaultProps {
  cls: (...args: ClassValue[]) => string;
  arrow: boolean;
  className: string;
  contentClassName: string;
  offset: number;
  disabled?: boolean;
  isVisible?: boolean;
  visibleOn: 'click' | 'over' | 'context';
  placement: Placement;
  hideOnClickOut: boolean;
  hideOnBlur: boolean;
  position: 'absolute' | 'fixed';
  clickTimeGap: number;
  onClick: () => void;
  onChange: (isVisible: boolean) => void;
  onContext: () => void;
  onClickOut: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export type DropDownState = {
  isVisible: boolean;
  uid: string;
  triggerId: `dropdown-trigger${DropDownState['uid']}`;
  menuId: `dropdown-menu${DropDownState['uid']}`;
};

export type DropDownMediator = {
  onBlur: () => void;
  onClick: () => void;
  onContext: (e: any) => void;
  onMounted: (root: HTMLElement) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onUnmount: () => void;
  onKeyDown: (e: any) => void;
  getContext: (props: DropDownDefaultProps, state: DropDownState) => DropDownContext;
  registerContent: (cainer: HTMLElement, content: HTMLElement, arrow?: HTMLElement | null) => void;
  registerTarget: (target: HTMLElement) => void;
  setArrowRef: (arrow?: HTMLElement | null) => void;
  state: DropDownState;
};

export interface DropDownContext {
  props: DropDownDefaultProps;
  onKeyDown: (e: any) => void;
  onClick: () => void;
  registerContent: (cainer: HTMLElement, content: HTMLElement, arrow?: HTMLElement | null) => void;
  registerTarget: (target: HTMLElement) => void;
  setArrowRef: (arrow?: HTMLElement | null) => void;
  state: DropDownState;
};
