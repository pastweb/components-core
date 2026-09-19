import type { ClassValue } from '@pastweb/tools';

export interface SpinnerProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  decorative?: boolean;
}

export interface SpinnerDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  decorative: boolean;
}

export interface SpinnerState {
  ariaLabel: string | undefined;
  ariaLive: 'polite' | undefined;
  role: 'status' | undefined;
}

export interface SpinnerMediator {
  state: SpinnerState;
}
