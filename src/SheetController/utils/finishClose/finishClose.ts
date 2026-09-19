import type {
  SheetControllerDefaultProps,
  SheetControllerState,
  SheetControllerVars,
} from '../../types';

/**
 * Finalizes sheet closure once, removing the portal entry and reporting `onClose`.
 *
 * @example
 * ```ts
 * finishClose({ props, state, vars });
 * ```
 */
export function finishClose(params: {
  props: SheetControllerDefaultProps;
  state: SheetControllerState;
  vars: SheetControllerVars;
  id?: string;
}): void {
  const { props, state, vars, id = props.entryId } = params;
  if (vars.finalized) return;
  vars.finalized = true;
  state.isClosed = true;
  state.isClosing = false;
  if (id) props.portal?.remove(id);
  props.onClose();
}
