import type { Placement } from '@floating-ui/dom';
import type { ClassValue } from '@pastweb/tools';

export type { Placement } from '@floating-ui/dom';

export interface TooltipProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  content: string;
  placement?: Placement;
  disabled?: boolean;
  offset?: number;
};

export interface TooltipDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  content: string;
  placement: Placement;
  disabled: boolean;
  offset: number;
};

export interface TooltipState {
  isVisible: boolean;
};

export interface TooltipMediator {
  state: TooltipState;
  onMounted: (target: HTMLElement, tooltip: HTMLElement, arrow: HTMLElement) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
