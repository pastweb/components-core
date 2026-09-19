import type { DateTimePickerMediatorVars } from '../types';

export function stopPositionUpdates(vars: DateTimePickerMediatorVars): void {
  vars.stopPositionUpdates?.();
  vars.stopPositionUpdates = undefined;
}
