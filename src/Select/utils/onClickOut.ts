import type { SelectMediatorVars, SelectState } from '../types';
import { isInside } from './isInside';
import { onClose } from './onClose';

/**
 * Closes an open Select after an outside activation.
 *
 * @example
 * ```ts
 * onClickOut(state, vars, event);
 * ```
 */
export function onClickOut(
  state: SelectState,
  vars: SelectMediatorVars,
  event?: Event,
): void {
  if (!state.isOpen) return;
  if (
    isInside(vars.triggerReference, event?.target) ||
    isInside(vars.listboxReference, event?.target)
  ) return;
  onClose(state, vars);
}
