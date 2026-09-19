import { autoUpdate } from '@floating-ui/dom';
import type { DateTimePickerMediatorVars } from '../types';
import { stopPositionUpdates } from './stopPositionUpdates';
import { updatePosition } from './updatePosition';

/** Starts Floating UI's observer loop once both portal references exist. */
export function startPositionUpdates(vars: DateTimePickerMediatorVars): void {
  stopPositionUpdates(vars);
  const trigger = vars.triggerReference;
  const calendar = vars.calendarReference;
  if (!trigger || !calendar) return;
  vars.stopPositionUpdates = autoUpdate(trigger, calendar, () => updatePosition(vars));
}
