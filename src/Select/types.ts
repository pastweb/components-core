import type { ClassValue } from '@pastweb/tools';
import type { Placement } from '@floating-ui/dom';

export interface SelectProps {
  cls: (...args: ClassValue[]) => string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  tabIndex?: number;
  label?: string;
  labelPlacement?: Placement;
  onChange?: (value: any) => void;
  value?: any;
  offset?: number,
  closeOnSelect?: boolean;
};

export interface SelectDefaultProps {
  cls: (...args: ClassValue[]) => string;
  disabled?: boolean;
  className: string;
  id?: string;
  name?: string;
  tabIndex: number;
  label?: string;
  labelPlacement: Placement;
  onChange: (value: any) => void;
  value?: any;
  offset: number,
  closeOnSelect?: boolean;
};

export type SelectState = {
  inputId: string;
  isOpen: boolean;
  value: any;
  highlightIndex: number | null;
};

export interface SelectMediator {
  state: SelectState;
  onBlur: () => void;
  onChange: (value: any) => void;
  onClick: (e: any) => void;
  onKeyDown: (e: any) => void;
  onOptionKeyDown: (e: any, value: any) => void;
  onMounted: (buttonElement: HTMLElement, menuElement: HTMLElement) => void;
  onUnmounted: () => void;
  registerItem: () => number;
};

export type SelectContext = SelectMediator;
