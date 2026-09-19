import { idCache } from '../../utils';
import type { FileUploaderMediatorVars } from '../types';

/**
 * Releases the generated FileUploader ID and mounted picker reference.
 *
 * @example
 * ```ts
 * useBeforeUnmount(uid, vars);
 * ```
 */
export function useBeforeUnmount(
  uid: string,
  vars: FileUploaderMediatorVars,
): void {
  vars.inputReference = undefined;
  idCache.removeId(uid);
}
