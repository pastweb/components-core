import type { TaskBarDefaultProps } from './types';

export const DEFAULT_PROPS: Partial<TaskBarDefaultProps> = {
  ariaLabel: 'Window taskbar',
  className: '',
  getLabel: window => String(window.meta.label ?? window.meta.title ?? window.id),
};
