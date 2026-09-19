import { finishClose } from '../finishClose';
import type {
  SheetControllerDefaultProps,
  SheetControllerState,
  SheetControllerVars,
} from '../../types';

/**
 * Completes closure when the exit animation finishes, cancelling the fallback timer.
 *
 * @example
 * ```ts
 * onTransitionEnd({ props, state, vars });
 * ```
 */
export function onTransitionEnd(params: {
  props: SheetControllerDefaultProps;
  state: SheetControllerState;
  vars: SheetControllerVars;
}): void {
  const { props, state, vars } = params;
  if (!state.isClosing) return;
  clearTimeout(vars.closeTimer);
  finishClose({ props, state, vars });
}
