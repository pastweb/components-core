import { autoUpdate } from '@floating-ui/dom';
import type { SelectDefaultProps, SelectMediatorVars } from '../types';
import { stopPositionUpdates } from './stopPositionUpdates';
import { updatePosition } from './updatePosition';

/**
 * Keeps an open Select listbox aligned to its trigger.
 *
 * @example
 * ```ts
 * startPositionUpdates(props, vars);
 * ```
 */
export function startPositionUpdates(
  props: SelectDefaultProps,
  vars: SelectMediatorVars,
): void {
  stopPositionUpdates(vars);
  const trigger = vars.triggerReference;
  const listbox = vars.listboxReference;
  if (!trigger || !listbox) {
    updatePosition(props, vars);
    return;
  }
  vars.stopPositionUpdates = autoUpdate(trigger, listbox, () => {
    updatePosition(props, vars);
  });
}
