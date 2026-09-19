import type { WalktourViewport } from '../types';

/** Returns the current viewport dimensions without assuming a browser during SSR. */
export function getViewport(): WalktourViewport {
  return typeof window === 'undefined' ? { width: 0, height: 0 } : { width: window.innerWidth, height: window.innerHeight };
}
