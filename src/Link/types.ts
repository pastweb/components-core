import type { ClassValue } from '@pastweb/tools';

export interface LinkProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: '_self' | '_blank';
  id?: string;
  onClick?: (event: unknown) => void;
}

export interface LinkDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  disabled: boolean;
  href: string;
  target: '_self' | '_blank';
  id?: string;
  onClick: (event: unknown) => void;
}

export interface LinkClickEvent {
  preventDefault?: () => void;
}

export interface LinkState {
  isDisabled: true | undefined;
}

export interface LinkMediator {
  onClick: (event: LinkClickEvent) => void;
  state: LinkState;
}
