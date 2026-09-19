import { idCache } from '../../utils';
import type { InputMediatorVars } from '../types';

/**
 * Releases the generated Input ID and mounted reference.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid, vars);
 * ```
 */
export function useBeforeUnmount(
  uid: string,
  vars: InputMediatorVars,
): void {
  vars.inputReference = undefined;
  idCache.removeId(uid);
}
