import type { ClassValue } from '@pastweb/tools';

export type SelectOption = {
  value: any;
  label: string;
  disabled?: boolean;
  component?: any;
};

export interface SelectProps {
  cls: (...args: ClassValue[]) => string;
  options: SelectOption[];
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  tabIndex?: number;
  label?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  onChange?: (value: any) => void;
  value?: any;
  loadingComponent?: any;
  leftComponent?: any;
  rightComponent?: any;
  closeOnSelect?: boolean;
};

export interface SelectDefaultProps {
  cls: (...args: ClassValue[]) => string;
  options: SelectOption[];
  disabled?: boolean;
  isLoading: boolean;
  className: string;
  id?: string;
  name?: string;
  placeholder: string;
  tabIndex: number;
  label?: string;
  labelPosition: 'left' | 'right' | 'top' | 'bottom';
  onChange: (value: any) => void;
  value?: any;
  loadingComponent?: any;
  leftComponent?: any;
  rightComponent?: any;
  closeOnSelect?: boolean;
};

export type SelectState = {
  isOpen: boolean;
  value: any;
  component?: any;
  highlightIndex: number | null;
}

export interface SelectMediator {
  state: SelectState;
  onChange: (value: any) => void;
  onClick: (e: any) => void;
  onKeyDown: (e: any) => void;
  onOptionKeyDown: (e: any, value: any) => void;
  onMounted: (buttonElement: HTMLElement, menuElement: HTMLElement) => void;
  onUnmounted: () => void;
};
