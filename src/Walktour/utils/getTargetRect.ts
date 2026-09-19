import type { WalktourRect } from '../types';

/** Reads the renderer-independent geometry required for a highlighted target. */
export function getTargetRect(target: HTMLElement): WalktourRect {
  const { top, right, bottom, left, width, height } = target.getBoundingClientRect();
  return { top, right, bottom, left, width, height };
}
