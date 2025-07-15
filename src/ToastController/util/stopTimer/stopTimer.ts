import type { ToastData } from '../../types';

export function stopTimer(data: ToastData): void {
  const { interval } = data;
  clearInterval(interval);
}
