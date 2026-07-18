import type { ClassValue } from '@pastweb/tools';

export interface ProgressBarProps {
  cls: (...args: ClassValue[]) => string;
  total?: number;
  current?: number;
  percentage?: number;
  label?: string | ((values: {
    total?: number;
    current?: number;
    percentage?: number;
  }) => string);
  className?: string;
  type?: 'linear' | 'circular';
  size?: number;
};

export interface ProgressBarDefaultProps {
  cls: (...args: ClassValue[]) => string;
  total?: number;
  current?: number;
  percentage?: number;
  label: string | ((values: {
    total?: number;
    current?: number;
    percentage?: number;
  }) => string);
  className: string;
  type: 'linear' | 'circular';
  size: number;
};

export interface ProgressBarState {
  circumference: number,
  offset: number,
  radius: number,
  percentage: number,
  width: string,
  labelContent: string | null,
};

export interface ProgressBarMediator {
  state: ProgressBarState;
};
