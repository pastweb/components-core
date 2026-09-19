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

export interface SplitLayoutItemMediator {
  state: SplitLayoutItemState;
  useBeforeUnmount: () => void;
}
