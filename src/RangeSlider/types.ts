import type { ClassValue } from '@pastweb/tools';

export interface RangeSliderProps {
  cls: (...args: ClassValue[]) => string;
  id?: string;
  label?: string;
  labelPlacement?: 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  min: number;
  step?: number;
  max: number;
  value?: number;
  className?: string;
  onChange?: (e: any) => void;
  onMouseUp?: (value: number) => void;
};

export interface RangeSliderDefaultProps {
  cls: (...args: ClassValue[]) => string;
  id?: string;
  label?: string;
  labelPlacement: 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  min: number;
  step?: number;
  max: number;
  value?: number;
  className: string;
  onChange: (value: string, e: any) => void;
  onMouseUp: (value: number) => void;
};

export interface RangeSliderState {
  value: string,
  uid: string,
  inputId: string,
};

export interface RangeSliderMediator {
  onChange: (vlaue: string, e: any) => void;
  onMouseUp: (e: any) => void;
  onUnmount: () => void;
  state: RangeSliderState;
};
