import type { ClassValue } from '@pastweb/tools';

export type PanelHeading = `h${2 | 3 | 4 | 5 | 6}`;

export interface PanelProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel?: string;
  border?: boolean;
  borderRadius?: boolean;
  className?: string;
  closeButton?: boolean;
  closeLabel?: string;
  maximizeButton?: boolean;
  maximizeLabel?: string;
  minimizeButton?: boolean;
  minimizeLabel?: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  id?: string;
  title?: string;
  contentPadding?: number | string;
  onClose?: () => void;
  onMaximize?: () => void;
  onMinimize?: () => void;
  rtl?: boolean;
}

export interface PanelDefaultProps {
  cls: (...args: ClassValue[]) => string;
  ariaLabel: string;
  className: string;
  title: string;
  border: boolean;
  borderRadius: boolean;
  onClose: () => void;
  closeButton: boolean;
  closeLabel: string;
  maximizeButton: boolean;
  maximizeLabel: string;
  minimizeButton: boolean;
  minimizeLabel: string;
  onMaximize: () => void;
  onMinimize: () => void;
  headingLevel: 2 | 3 | 4 | 5 | 6;
  id?: string;
  contentPadding: number | string;
  rtl: boolean;
}

export interface PanelState {
  ariaLabel: string | undefined;
  heading: PanelHeading;
  id: string;
  titleId: string | undefined;
}

export interface PanelMediator {
  onClose: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
  state: PanelState;
  useBeforeUnmount: () => void;
}
