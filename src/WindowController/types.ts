import type { ClassValue, Portal, WindowBounds, WindowManager, ManagedWindowState } from '@pastweb/tools';
import type { Animation } from '../types';

export type CloseOptions = { id?: string, isConfirmed?: boolean };

export interface WindowControllerProps {
  /** Resolves component and state classes. */
  cls: (...args: ClassValue[]) => string;
  /** Portal mount element supplied by the portal renderer. */
  portalElement?: HTMLElement;
  /** Registered portal entry ID. */
  entryId?: string;
  /** Portal controller used to update or close this entry. */
  portal?: Portal;
  /** Optional application window manager that owns this window's shared state. */
  manager?: WindowManager;
  /** Resolves the matching taskbar button bounds for minimize and restore animation. */
  getTaskBarButtonBounds?: (id: string) => WindowBounds | undefined;
  mode?: 'modal' | 'floating';
  moveCursor?: boolean;
  resizable?: boolean;
  resizeCursor?: boolean;
  width?: number;
  height?: number;
  animation?: Animation;
  ariaLabel?: string;
  /** Whether a backdrop click closes a modal window. */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape closes the window. */
  closeOnEscape?: boolean;
  /** Called when the window closes. */
  onClose?: () => void;
  /** Observes keyboard input on the window. */
  onKeyDown?: (event: KeyboardEvent) => void;
};

export interface WindowControllerDefaultProps {
  cls: (...args: ClassValue[]) => string;
  portalElement: HTMLElement;
  entryId: string;
  portal: Portal;
  manager?: WindowManager;
  getTaskBarButtonBounds?: (id: string) => WindowBounds | undefined;
  mode: 'modal' | 'floating';
  moveCursor: boolean;
  resizable: boolean;
  resizeCursor: boolean;
  width?: number;
  height?: number;
  animation: Animation;
  ariaLabel: string;
  /** Whether a backdrop click closes a modal window. */
  closeOnBackdropClick: boolean;
  /** Whether pressing Escape closes the window. */
  closeOnEscape: boolean;
  /** Called when the window closes. */
  onClose: () => void;
  /** Observes keyboard input on the window. */
  onKeyDown: (e: any) => void;
}

export type WindowContext = {
  /** Portal entry ID for this window. */
  id: string;
  /** Public controller configuration for this window. */
  props: Partial<WindowControllerDefaultProps>;
  /** Requests window closure through the existing portal lifecycle. */
  close: (closeOptions?: CloseOptions) => void;
  /** Registers a confirmation callback used before closing. */
  setConfirm: (fn: (() => void)) => void;
  /** Updates this portal entry's properties. */
  update: (props: Record<string, any>) => boolean;
  /** Reveals and activates this window. */
  bringToFront: (activate?: boolean) => void;
  /** Hides this window. Uses the manager state when a manager is installed. */
  hide: () => void;
  /** Reveals this window. Uses the manager state when a manager is installed. */
  show: () => void;
  /** Reveals, then minimizes this managed window. */
  minimize: () => boolean;
  /** Toggles this managed floating window between maximized and restored bounds. */
  maximize: () => boolean;
  /** Whether this window is currently active in its manager. */
  isActive: boolean;
  /** Current manager-owned state for this window, when a manager is installed. */
  manager?: ManagedWindowState;
};

export type WindowControllerState = {
  /** Whether the portal entry remains open. */
  isOpen: boolean;
  /** Local hidden state for unmanaged windows. */
  isHidden: boolean;
  /** Whether this window is currently active in its manager. */
  isActive: boolean;
  /** Current manager-owned state for this window, when a manager is installed. */
  manager?: ManagedWindowState;
};

export interface WindowControllerAnimationStyle {
  animationDelay?: string;
  animationDuration?: string;
  animationTimingFunction?: string;
  height?: string;
  left?: string;
  opacity?: string;
  top?: string;
  transform?: string;
  transformOrigin?: string;
  width?: string;
}

export interface WindowControllerVars {
  confirmClose: (() => void) | null;
  mountElement: HTMLElement | null;
  previousFocus: HTMLElement | null;
  windowElement: HTMLElement | null;
  manager?: ManagedWindowState;
}

export interface WindowControllerMediator {
  state: WindowControllerState;
  getContext: () => WindowContext;
  onMounted: (windowElement: HTMLElement) => void;
  onBackdropClick: () => void;
  onKeyDown: (e: any) => void;
  getAnimationStyle: () => WindowControllerAnimationStyle;
  useBeforeUnmount: () => void;
}
