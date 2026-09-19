import { idCache } from '../../utils';
import type { TooltipMediatorVars } from '../types';
import { clearTimers } from './clearTimers';

/**
 * Releases timers, references, and the generated Tooltip ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid, vars);
 * ```
 */
export function useBeforeUnmount(
  uid: string,
  vars: TooltipMediatorVars,
): void {
  clearTimers(vars);
  vars.triggerReference = undefined;
  vars.tooltipReference = undefined;
  vars.arrowReference = undefined;
  idCache.removeId(uid);
}
