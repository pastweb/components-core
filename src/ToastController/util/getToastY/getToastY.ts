import { getFullElementSize } from '@pastweb/tools';
import type { ToastControllerDefaultProps } from '../../types';

export function getToastY(props: ToastControllerDefaultProps): number {
  const { portalElement, entryId, placement, padding, } = props;

  const toasts = [...portalElement.children || []];

  if (!toasts.length) return 0;

  let y = 0;

  for (const t of toasts) {
    if (t.id === entryId) break;

    const container = t.firstElementChild as HTMLElement | null;

    if (!container?.className) continue;

    const samePosition = container.className.split(' ').includes(placement);

    if (!samePosition) continue;

    const toast = container.firstElementChild as HTMLElement | null;

    if (!toast) continue;

    y += Math.ceil(getFullElementSize(toast).height) - padding;
  }

  return y;
}
