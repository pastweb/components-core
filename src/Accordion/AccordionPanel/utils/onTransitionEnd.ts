import type {
  AccordionPanelMediatorVars,
  AccordionPanelState,
} from '../types';
import { completeClose } from './completeClose';

/**
 * Completes a visual close once the content transition has finished.
 *
 * @example
 * ```ts
 * onTransitionEnd(state, vars);
 * ```
 */
export function onTransitionEnd(
  state: AccordionPanelState,
  vars: AccordionPanelMediatorVars,
): void {
  if (!state.isOpen) {
    completeClose(state, vars);
  }
}
