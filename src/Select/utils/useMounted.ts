import type { SelectMediatorVars, SelectState } from '../types';
import { addEventListeners } from './addEventListeners';

/**
 * Stores mounted Select references and starts outside-activation listening.
 *
 * @example
 * ```ts
 * useMounted(state, vars, trigger, listbox);
 * ```
 */
export function useMounted(
  state: SelectState,
  vars: SelectMediatorVars,
  trigger: HTMLElement,
  listbox: HTMLElement,
): void {
  vars.triggerReference = trigger;
  vars.listboxReference = listbox;
  addEventListeners(state, vars);
}
