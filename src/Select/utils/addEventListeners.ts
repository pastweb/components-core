import type { SelectMediatorVars, SelectState } from '../types';
import { onClickOut } from './onClickOut';

/**
 * Registers the document listener used to close the Select on outside activation.
 *
 * Capture-phase `pointerdown` runs before a nested Select can stop the event,
 * so opening another Select still closes this one.
 *
 * @example
 * ```ts
 * addEventListeners(state, vars);
 * ```
 */
export function addEventListeners(
  state: SelectState,
  vars: SelectMediatorVars,
): void {
  if (vars.outsideClickListener) return;
  vars.outsideClickListener = event => onClickOut(state, vars, event);
  document.addEventListener('pointerdown', vars.outsideClickListener, true);
}
