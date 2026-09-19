import { idCache } from '../../utils';
import type { DropDownMediatorVars } from '../types';
import { removeEventListeners } from './removeEventListeners';

/**
 * Releases DropDown timers, listeners, references, and the generated ID.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid, vars);
 * ```
 */
export function useBeforeUnmount(
  uid: string,
  vars: DropDownMediatorVars,
): void {
  if (vars.clickTimer) clearTimeout(vars.clickTimer);
  removeEventListeners(vars);
  idCache.removeId(uid);
  vars.rootReference = undefined;
  vars.targetReference = undefined;
  vars.containerReference = undefined;
  vars.contentReference = undefined;
  vars.arrowReference = undefined;
  vars.clickTimer = undefined;
  vars.outsideClickListener = undefined;
}
