import type { ClassValue } from '@pastweb/tools';

export interface CarouselItemProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
};

export interface CarouselItemDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  disabled: boolean;
};

export interface CarouselItemState {
  ariaHidden: true | undefined;
  ariaLabel: string;
  ariaRoleDescription: 'slide';
  className: string;
  index: number;
  inert: true | undefined;
  isActive: boolean;
  isDisabled: true | undefined;
  role: 'group';
};

export interface CarouselItemMediator {
  state: CarouselItemState;
  useBeforeMount: () => void;
};