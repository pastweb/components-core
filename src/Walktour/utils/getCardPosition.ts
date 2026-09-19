import type { WalktourCardPosition, WalktourRect, WalktourStep } from '../types';

/** Calculates the card position from a target rectangle and placement. */
export function getCardPosition(rect: WalktourRect | null, placement: WalktourStep['placement'], offset: number): WalktourCardPosition {
  if (!rect || placement === 'center') return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

  const centreX = rect.left + rect.width / 2;
  const centreY = rect.top + rect.height / 2;
  if (placement === 'top') return { top: Math.max(12, rect.top - offset), left: centreX, transform: 'translate(-50%, -100%)' };
  if (placement === 'left') return { top: centreY, left: Math.max(12, rect.left - offset), transform: 'translate(-100%, -50%)' };
  if (placement === 'right') return { top: centreY, left: rect.right + offset, transform: 'translateY(-50%)' };
  return { top: rect.bottom + offset, left: centreX, transform: 'translateX(-50%)' };
}
