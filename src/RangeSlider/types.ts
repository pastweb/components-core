import type { ClassValue } from '@pastweb/tools';

export interface RangeSliderProps {
  cls: (...args: ClassValue[]) => string;
  id?: string;
  label?: string;
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
  min: number;
  step?: number;
  max: number;
  value?: number;
  className: string;
  onChange: (e: any) => void;
  onMouseUp: (value: number) => void;
};

export interface RangeSliderState {
  value: string,
};

export interface RangeSliderMediator {
  state: RangeSliderState;
  onChange: (e: any) => void;
  onMouseUp: (e: any) => void;
};
