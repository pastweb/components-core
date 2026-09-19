import type { TooltipMediatorVars } from '../types';

/**
 * Clears pending show and hide timers.
 *
 * @example
 * ```ts
 * clearTimers(vars);
 * ```
 */
export function clearTimers(vars: TooltipMediatorVars): void {
  if (vars.showTimer) clearTimeout(vars.showTimer);
  if (vars.hideTimer) clearTimeout(vars.hideTimer);
  vars.showTimer = undefined;
  vars.hideTimer = undefined;
}
