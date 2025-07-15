import { TOAST_REMOVED_EVENT } from '../../constants';
import type { ToastData } from '../../types';

export function reCalculateY(data: ToastData, calculateY: () => void) {
  return (e: any): void => {
    if (e.type === TOAST_REMOVED_EVENT && e.detail.entryId !== data.toastId) {
      calculateY();
    }
  };
}
