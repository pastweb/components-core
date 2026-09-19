import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { DateTimePickerMediatorVars } from '../types';

/** Positions the mounted floating calendar relative to its trigger. */
export function updatePosition(vars: DateTimePickerMediatorVars): void {
  const trigger = vars.triggerReference;
  const calendar = vars.calendarReference;
  if (!trigger || !calendar) return;

  computePosition(trigger, calendar, {
    strategy: 'absolute',
    placement: 'bottom-start',
    middleware: [offset(6), flip(), shift({ padding: 8 })],
  }).then(({ x, y }) => {
    if (calendar.isConnected && vars.calendarReference === calendar) {
      Object.assign(calendar.style, { left: `${x}px`, top: `${y}px` });
    }
  });
}
