import type { SelectMediatorVars } from '../types';

/**
 * Removes the document listener registered for Select outside activation.
 *
 * @example
 * ```ts
 * removeEventListeners(vars);
 * ```
 */
export function removeEventListeners(vars: SelectMediatorVars): void {
  if (!vars.outsideClickListener) return;
  document.removeEventListener('pointerdown', vars.outsideClickListener, true);
  vars.outsideClickListener = undefined;
}
