import type { Placement } from '@floating-ui/dom';
import type { ClassValue } from '@pastweb/tools';

export type { Placement } from '@floating-ui/dom';

export interface TooltipProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  content: string;
  placement?: Placement;
  disabled?: boolean;
};

export interface TooltipDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  content: string;
  placement: Placement;
  disabled: boolean;
};

export interface TooltipState {
  isVisible: boolean;
};

export interface TooltipMediator {
  state: TooltipState;
  onMounted: (root: HTMLElement, target: HTMLElement, tooltip: HTMLElement, arrow: HTMLElement) => void;
  onUnmount: () => void;
};
