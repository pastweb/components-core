import type {
  AccordionPanelControlReference,
  AccordionPanelMediatorVars,
} from '../types';

/**
 * Stores the mounted trigger reference used after the panel is attached.
 *
 * @example
 * ```ts
 * useMounted(vars, triggerReference);
 * ```
 */
export function useMounted(
  vars: AccordionPanelMediatorVars,
  triggerReference: AccordionPanelControlReference,
): void {
  vars.triggerReference = triggerReference;
}
