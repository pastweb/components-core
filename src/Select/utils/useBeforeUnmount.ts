import { idCache } from '../../utils';
import type { SelectMediatorVars } from '../types';
import { removeEventListeners } from './removeEventListeners';
import { unregisterOpenSelect } from './registerOpenSelect';
import { stopPositionUpdates } from './stopPositionUpdates';

/**
 * Releases the generated Select ID, listeners, and mounted references.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid, vars);
 * ```
 */
export function useBeforeUnmount(
  uid: string,
  vars: SelectMediatorVars,
): void {
  if (vars.clickTimer) clearTimeout(vars.clickTimer);
  unregisterOpenSelect(vars.close);
  stopPositionUpdates(vars);
  removeEventListeners(vars);
  vars.triggerReference = undefined;
  vars.listboxReference = undefined;
  vars.clickTimer = undefined;
  idCache.removeId(uid);
}
