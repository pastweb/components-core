import { idCache } from '../../../utils';
import type { SheetControllerVars, SheetEvent } from '../../types';
import { restoreFocus } from '../restoreFocus';

/**
 * Clears the close timer, portal listener, and generated ID cache entry.
 *
 * @example
 * ```ts
 * useBeforeUnmount({ vars, onPortalClose, uid });
 * ```
 */
export function useBeforeUnmount(params: {
  vars: SheetControllerVars;
  onPortalClose: (event: SheetEvent) => void;
  uid: string;
}): void {
  const { vars, onPortalClose, uid } = params;
  clearTimeout(vars.closeTimer);
  restoreFocus(vars);
  vars.host?.removeEventListener?.('close', onPortalClose);
  idCache.removeId(uid);
  vars.previousFocus = undefined;
}
