import type { ClassValue } from '@pastweb/tools';

export type WalktourPlacement = 'top' | 'right' | 'bottom' | 'left' | 'center';

export interface WalktourStep {
  /** Framework-neutral element reference. Omit for a centred step. */
  ref?: { value: HTMLElement | null };
  title?: any;
  description: any;
  placement?: WalktourPlacement;
  maskPadding?: number;
  maskRadius?: number;
  offset?: number;
  nextLabel?: string;
  previousLabel?: string;
  closeLabel?: string;
  disableNext?: boolean;
  disablePrevious?: boolean;
  disableClose?: boolean;
  nextOnTargetClick?: boolean;
}

export interface WalktourProps {
  cls: (...args: ClassValue[]) => string;
  steps: WalktourStep[];
  open?: boolean;
  initialStepIndex?: number;
  className?: string;
  zIndex?: number;
  maskPadding?: number;
  maskRadius?: number;
  offset?: number;
  placement?: WalktourPlacement;
  disableMask?: boolean;
  disableMaskInteraction?: boolean;
  closeOnMaskClick?: boolean;
  closeOnEscape?: boolean;
  scrollIntoView?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  closeLabel?: string;
  onOpenChange?: (open: boolean) => void;
  onStepChange?: (index: number, step: WalktourStep) => void;
  onComplete?: () => void;
  onClose?: () => void;
}

export interface WalktourDefaultProps extends WalktourProps {
  initialStepIndex: number;
  className: string;
  zIndex: number;
  maskPadding: number;
  maskRadius: number;
  offset: number;
  placement: WalktourPlacement;
  disableMask: boolean;
  disableMaskInteraction: boolean;
  closeOnMaskClick: boolean;
  closeOnEscape: boolean;
  scrollIntoView: boolean;
  nextLabel: string;
  previousLabel: string;
  closeLabel: string;
}

export interface WalktourRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

export interface WalktourViewport {
  width: number;
  height: number;
}

export interface WalktourHole {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface WalktourCardPosition {
  top: number | string;
  left: number | string;
  transform: string;
}

export interface WalktourState {
  isOpen: boolean;
  stepIndex: number;
  targetRect: WalktourRect | null;
  step: WalktourStep | undefined;
  hole: WalktourHole | null;
  cardPosition: WalktourCardPosition;
  maskPadding: number;
  maskRadius: number;
  isMaskVisible: boolean;
  isTargetInteractionDisabled: boolean;
  canClose: boolean;
  canNext: boolean;
  canPrevious: boolean;
  closeLabel: string;
  nextLabel: string;
  previousLabel: string;
}

export interface WalktourMediator {
  state: WalktourState;
  close: () => void;
  next: () => void;
  previous: () => void;
  open: (index?: number) => void;
  onKeyDown: (key: string) => void;
  onMaskClick: () => void;
  onTargetClick: () => void;
  setTarget: (rect: WalktourRect | null, viewport: WalktourViewport) => void;
  useMounted: () => void;
  useBeforeUnmount: () => void;
}

export interface WalktourMediatorVars {
  viewport: WalktourViewport | null;
  isMounted: boolean;
  target: HTMLElement | null;
}
