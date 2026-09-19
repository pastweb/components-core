import type { Placement } from '@floating-ui/dom';
import type { ClassValue } from '@pastweb/tools';

export type { AlignedPlacement, Placement, Side } from '@floating-ui/dom';

export type VisibleTarget = 'element' | 'pointer';

export interface DropDownPointerPosition {
  x: number;
  y: number;
}

export interface DropDownPointerEvent {
  target?: EventTarget | null;
  clientX?: number;
  clientY?: number;
}

export interface DropDownProps {
  cls: (...args: ClassValue[]) => string;
  id?: string;
  ariaLabel?: string;
  arrow?: boolean;
  className?: string;
  contentClassName?: string;
  offset?: number;
  disabled?: boolean;
  isVisible?: boolean;
  visibleOn?: 'click' | 'over' | 'context';
  visibleTarget?: VisibleTarget;
  placement?: Placement;
  hideOnClick?: boolean;
  hideOnClickOut?: boolean;
  hideOnBlur?: boolean;
  position?: 'absolute' | 'fixed';
  clickTimeGap?: number;
  onClick?: () => void;
  onChange?: (isVisible: boolean) => void;
  onContext?: () => void;
  onClickOut?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface DropDownDefaultProps {
  cls: (...args: ClassValue[]) => string;
  id?: string;
  ariaLabel: string;
  arrow: boolean;
  className: string;
  contentClassName: string;
  offset: number;
  disabled: boolean;
  isVisible: boolean;
  visibleOn: 'click' | 'over' | 'context';
  visibleTarget: VisibleTarget;
  placement: Placement;
  hideOnClick: boolean;
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
}

export interface DropDownState {
  ariaLabel: string | undefined;
  contentId: string;
  isDisabled: true | undefined;
  isVisible: boolean;
  triggerId: string;
}

export interface DropDownMediatorVars {
  rootReference: HTMLElement | undefined;
  targetReference: HTMLElement | undefined;
  containerReference: HTMLElement | undefined;
  contentReference: HTMLElement | undefined;
  arrowReference: HTMLElement | null | undefined;
  clickTimer: ReturnType<typeof setTimeout> | undefined;
  elementClicked: boolean;
  outsideClickListener: ((event: Event) => void) | undefined;
  pointerPosition: DropDownPointerPosition | undefined;
}

export interface DropDownKeyEvent {
  key: string;
  preventDefault?: () => void;
}

export interface DropDownContextMethods {
  hide: () => void;
  onClick: (event?: DropDownPointerEvent) => void;
  onKeyDown: (event: DropDownKeyEvent) => void;
  setArrowRef: (arrow?: HTMLElement | null) => void;
}

export interface DropDownContext extends DropDownContextMethods {
  readonly ariaLabel: string | undefined;
  readonly arrow: boolean;
  readonly cls: DropDownDefaultProps['cls'];
  readonly contentClassName: string;
  readonly contentId: string;
  readonly id: string;
  readonly isDisabled: true | undefined;
  readonly isVisible: boolean;
  readonly position: 'absolute' | 'fixed';
  readonly triggerId: string;
}

export interface DropDownContextEvent extends DropDownPointerEvent {
  preventDefault?: () => void;
}

export interface DropDownMediator {
  getContext: () => DropDownContext;
  hide: () => void;
  id: string;
  onBlur: (event?: { relatedTarget?: EventTarget | null }) => void;
  onClick: (event?: DropDownPointerEvent) => void;
  onContext: (event: DropDownContextEvent) => void;
  onKeyDown: (event: DropDownKeyEvent) => void;
  onMouseEnter: (event?: DropDownPointerEvent) => void;
  onMouseLeave: (event?: { buttons?: number }) => void;
  setArrowRef: (arrow?: HTMLElement | null) => void;
  state: DropDownState;
  useBeforeUnmount: () => void;
  useMounted: (
    root: HTMLElement,
    target: HTMLElement,
    container: HTMLElement,
    content: HTMLElement,
  ) => void;
}
