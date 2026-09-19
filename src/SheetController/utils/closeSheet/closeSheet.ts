import { finishClose } from '../finishClose';
import type {
  CloseOptions,
  SheetControllerDefaultProps,
  SheetControllerState,
  SheetControllerVars,
} from '../../types';

/**
 * Starts the close transition, or defers to a confirm callback when one is set.
 *
 * @example
 * ```ts
 * closeSheet({ props, state, vars });
 * ```
 */
export function closeSheet(params: {
  props: SheetControllerDefaultProps;
  state: SheetControllerState;
  vars: SheetControllerVars;
  closeOptions?: CloseOptions;
}): void {
  const { props, state, vars, closeOptions = {} } = params;
  if (!state.isOpen || state.isClosing) return;
  if (vars.confirmClose && !closeOptions.isConfirmed) {
    vars.confirmClose();
    return;
  }

  state.isOpen = false;
  state.isClosing = true;
  clearTimeout(vars.closeTimer);
  vars.closeTimer = setTimeout(
    () => finishClose({ props, state, vars, id: closeOptions.id }),
    Math.max(0, props.animationTime),
  );
}
