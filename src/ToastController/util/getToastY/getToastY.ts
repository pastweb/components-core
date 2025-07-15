import { getFullElementSize } from '@pastweb/tools';
import type { ToastControllerDefaultProps } from '../../types';

export function getToastY(props: ToastControllerDefaultProps): number {
  const { portalElement, entryId, position, padding, } = props;

  const toasts = Array.from(portalElement.children || []);

  if (!toasts.length) return 0;

  let y = 0;

  for (const t of toasts) {
    if (t.id === entryId) break;

    const container = t.firstChild as HTMLElement;
    const samePosition = container.className.split(' ').includes(position);

    if (!samePosition) continue;

    const toast = container.firstChild as HTMLElement;
    y += Math.ceil(getFullElementSize(toast).height) - padding;
  }

  return y;
}
