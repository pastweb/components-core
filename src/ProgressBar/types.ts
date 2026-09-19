import type { ClassValue } from '@pastweb/tools';

export interface ProgressBarLabelValues {
  total?: number;
  current?: number;
  percentage?: number;
}

export interface ProgressBarProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  total?: number;
  current?: number;
  percentage?: number;
  label?: string | ((values: ProgressBarLabelValues) => string);
  className?: string;
  type?: 'linear' | 'circular';
  size?: number;
}

export interface ProgressBarDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  total?: number;
  current?: number;
  percentage?: number;
  label: string | ((values: ProgressBarLabelValues) => string);
  className: string;
  type: 'linear' | 'circular';
  size: number;
}

export interface ProgressBarState {
  ariaLabel: string | undefined;
  circumference: number;
  offset: number;
  radius: number;
  percentage: number;
  width: string;
  labelContent: string | null;
  valueText: string;
}

export interface ProgressBarMediator {
  state: ProgressBarState;
}
