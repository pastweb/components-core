import type { ToastData } from '../../types';

export function getToastIndex(data: ToastData): number {
  const { portalElement, toastId } = data;
  return Array.from(portalElement.children || []).map(({ id }) => id).indexOf(toastId);
}
