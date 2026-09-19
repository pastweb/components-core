import type { ClassValue } from '@pastweb/tools';

export interface PlaceholderProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  className?: string;
  decorative?: boolean;
}

export interface PlaceholderDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  decorative: boolean;
}

export interface PlaceholderState {
  ariaHidden: true | undefined;
  ariaLabel: string | undefined;
  ariaLive: 'polite' | undefined;
  role: 'status' | undefined;
}

export interface PlaceholderMediator {
  state: PlaceholderState;
}
