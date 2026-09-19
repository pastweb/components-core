import type { WalktourHole, WalktourRect, WalktourViewport } from '../types';

/** Expands a target rectangle into the visible mask hole. */
export function getHole(rect: WalktourRect | null, viewport: WalktourViewport | null, padding: number): WalktourHole | null {
  if (!rect || !viewport) return null;
  return {
    top: Math.max(0, rect.top - padding),
    right: Math.min(viewport.width, rect.right + padding),
    bottom: Math.min(viewport.height, rect.bottom + padding),
    left: Math.max(0, rect.left - padding),
  };
}
