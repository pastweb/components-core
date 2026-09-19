import type { ClassValue } from '@pastweb/tools';

export type TooltipPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end';

/** @deprecated Use TooltipPlacement. */
export type Placement = TooltipPlacement;

export interface TooltipKeyEvent {
  key: string;
  preventDefault?: () => void;
}

export interface TooltipProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  content: string;
  disabled?: boolean;
  hideDelay?: number;
  id?: string;
  offset?: number;
  placement?: TooltipPlacement;
  showDelay?: number;
  tooltipClassName?: string;
}

export interface TooltipDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  content: string;
  disabled: boolean;
  hideDelay: number;
  id?: string;
  offset: number;
  placement: TooltipPlacement;
  showDelay: number;
  tooltipClassName: string;
}

export interface TooltipState {
  isDisabled: true | undefined;
  isVisible: boolean;
  tooltipId: string;
}

export interface TooltipMediatorVars {
  arrowReference: HTMLElement | undefined;
  hideTimer: ReturnType<typeof setTimeout> | undefined;
  showTimer: ReturnType<typeof setTimeout> | undefined;
  tooltipReference: HTMLElement | undefined;
  triggerReference: HTMLElement | undefined;
}

export interface TooltipMediator {
  hide: (immediate?: boolean) => void;
  onKeyDown: (event: TooltipKeyEvent) => void;
  show: (immediate?: boolean) => void;
  state: TooltipState;
  useBeforeUnmount: () => void;
  useMounted: (trigger: HTMLElement, tooltip: HTMLElement, arrow: HTMLElement) => void;
}
