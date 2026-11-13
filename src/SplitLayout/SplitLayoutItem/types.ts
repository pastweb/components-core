export interface SplitLayoutItemProps {
  ariaLabel?: string;
  className?: string;
  id?: string;
  index?: number;
}

export interface SplitLayoutItemDefaultProps {
  ariaLabel: string;
  className: string;
  id?: string;
  index: number;
}

export interface SplitLayoutItemState {
  ariaLabel: string | undefined;
  id: string;
  separatorLabel: string;
}

export interface SplitLayoutPointerTarget {
  parentElement?: {
    getBoundingClientRect: () => { height: number; width: number };
  } | null;
  hasPointerCapture?: (pointerId: number) => boolean;
  releasePointerCapture?: (pointerId: number) => void;
  setPointerCapture?: (pointerId: number) => void;
}

export interface SplitLayoutPointerEvent {
  clientX: number;
  clientY: number;
  currentTarget: SplitLayoutPointerTarget;
  pointerId: number;
  preventDefault?: () => void;
}

export interface SplitLayoutPointerInput {
  clientX: number;
  clientY: number;
  currentTarget: unknown;
  pointerId: number;
  preventDefault?: () => void;
}

export interface SplitLayoutItemMediatorVars {
  lastPosition: number | null;
}

export interface SplitLayoutItemMediator {
  onPointerDown: (event: SplitLayoutPointerInput) => void;
  onPointerMove: (event: SplitLayoutPointerInput) => void;
  onPointerUp: (event: SplitLayoutPointerInput) => void;
  state: SplitLayoutItemState;
  useBeforeUnmount: () => void;
}
