import type { ClassValue } from '@pastweb/tools';

export type RangeSliderPlacement =
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

export interface RangeSliderProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  labelPlacement?: RangeSliderPlacement;
  min: number;
  step?: number;
  max: number;
  value?: number;
  className?: string;
  onChange?: (value: string, e: any) => void;
  onMouseUp?: (value: number) => void;
}

export interface RangeSliderDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  disabled: boolean;
  id?: string;
  label: string;
  labelPlacement: RangeSliderPlacement;
  min: number;
  step?: number;
  max: number;
  value?: number;
  className: string;
  onChange: (value: string, e: any) => void;
  onMouseUp: (value: number) => void;
}

export interface RangeSliderState {
  ariaLabel: string | undefined;
  inputId: string;
  isDisabled: true | undefined;
  value: string;
}

export interface RangeSliderMediator {
  onChange: (value: string, e: any) => void;
  onChangeEnd: () => void;
  state: RangeSliderState;
  useBeforeUnmount: () => void;
}
