import type { ClassValue } from '@pastweb/tools';
import type { Placement } from '@floating-ui/dom';

export interface SelectProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  id?: string;
  name?: string;
  tabIndex?: number;
  label?: string;
  placeholder?: string;
  labelPlacement?: Placement;
  onChange?: (value: any) => void;
  value?: any;
  offset?: number;
  closeOnSelect?: boolean;
  hideOnClick?: boolean;
}

export interface SelectDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  disabled: boolean;
  loading: boolean;
  className: string;
  id?: string;
  name?: string;
  tabIndex: number;
  label: string;
  placeholder: string;
  labelPlacement: Placement;
  onChange: (value: any) => void;
  value?: any;
  offset: number;
  closeOnSelect: boolean;
  hideOnClick: boolean;
}

export type SelectState = {
  ariaLabel: string | undefined;
  highlightIndex: number | null;
  inputId: string;
  isDisabled: true | undefined;
  isLoading: true | undefined;
  isOpen: boolean;
  isUnavailable: true | undefined;
  labelId: string;
  listboxId: string;
  triggerId: string;
  value: any;
};

export interface SelectMediatorVars {
  listboxReference: HTMLElement | undefined;
  triggerReference: HTMLElement | undefined;
  clickTimer: ReturnType<typeof setTimeout> | undefined;
  close: () => void;
  itemsCounter: number;
  outsideClickListener: ((event: Event) => void) | undefined;
  stopPositionUpdates: (() => void) | undefined;
}

export interface SelectKeyEvent {
  key: string;
  shiftKey?: boolean;
  preventDefault?: () => void;
  stopPropagation?: () => void;
}

export interface SelectContextMethods {
  hide: () => void;
  onChange: (value: any) => void;
  onOptionKeyDown: (event: SelectKeyEvent, value: any, disabled?: boolean) => void;
  registerItem: () => number;
}

export interface SelectContext extends SelectContextMethods {
  readonly state: SelectState;
}

export interface SelectMediator {
  getContext: () => SelectContext;
  hide: () => void;
  id: string;
  onChange: (value: any) => void;
  onClose: (restoreFocus?: boolean) => void;
  onKeyDown: (event: SelectKeyEvent) => void;
  onOpen: (focus?: 'first' | 'last') => void;
  onOptionKeyDown: (event: SelectKeyEvent, value: any, disabled?: boolean) => void;
  onToggle: (event?: SelectKeyEvent) => void;
  registerItem: () => number;
  state: SelectState;
  useBeforeUnmount: () => void;
  useMounted: (trigger: HTMLElement, listbox: HTMLElement) => void;
}
