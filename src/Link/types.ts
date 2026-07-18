import type { ClassValue } from '@pastweb/tools';

export interface LinkProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: '_self' | '_blank';
  id?: string;
  onClick?: (e: any) => void;
};

export interface LinkDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  disabled: boolean;
  href: string;
  target: '_self' | '_blank';
  id?: string;
  onClick: (e: any) => void;
};
