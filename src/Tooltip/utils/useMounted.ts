import type { TooltipMediatorVars } from '../types';
import { describeTrigger } from './describeTrigger';

/**
 * Stores mounted trigger, tooltip, and arrow references.
 *
 * @example
 * ```ts
 * useMounted(vars, trigger, tooltip, arrow);
 * ```
 */
export function useMounted(
  vars: TooltipMediatorVars,
  trigger: HTMLElement,
  tooltip: HTMLElement,
  arrow: HTMLElement,
  tooltipId: string | undefined,
): void {
  vars.triggerReference = trigger;
  vars.tooltipReference = tooltip;
  vars.arrowReference = arrow;
  describeTrigger(trigger, tooltipId);
}
