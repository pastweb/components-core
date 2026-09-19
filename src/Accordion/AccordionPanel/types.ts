import type { ClassValue } from '@pastweb/tools';

export interface AccordionPanelProps {
  cls: (...args: ClassValue[]) => string;
  className?: string;
  disabled?: boolean;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  isOpen?: boolean;
  landmark?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  title?: string | number;
  rtl?: boolean;
  transitionDuration?: number;
};

export interface AccordionPanelDefaultProps {
  cls: (...args: ClassValue[]) => string;
  className: string;
  disabled: boolean;
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  isOpen: boolean;
  landmark: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  title: string | number;
  rtl: boolean;
  transitionDuration: number;
};

export interface AccordionPanelState {
  className: string;
  hideBorderBottom: boolean;
  isDisabled: true | undefined;
  isOpen: boolean;
  isRtl: true | undefined;
  role: 'region' | undefined;
  transitionDuration: string;
};

export interface AccordionPanelControlReference {
  focus: () => void;
};

export interface AccordionPanelMediatorVars {
  triggerReference: AccordionPanelControlReference | null;
  transitionTimer: ReturnType<typeof setTimeout> | undefined;
};

export interface AccordionPanelMediator {
  state: AccordionPanelState;
  id: string;
  triggerId: string;
  panelId: string;
  useMounted: (triggerReference: AccordionPanelControlReference) => void;
  onToggle: () => void;
  onTransitionEnd: () => void;
  useBeforeUnmount: () => void;
};
