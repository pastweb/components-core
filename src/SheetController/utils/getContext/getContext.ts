import type { SheetContext, SheetControllerDefaultProps } from '../../types';

/**
 * Builds the sheet context used by nested content to close, confirm, or update the portal entry.
 *
 * @example
 * ```ts
 * getContext({ props, id, setConfirm, closeSheet });
 * ```
 */
export function getContext(params: {
  props: SheetControllerDefaultProps;
  id: string;
  setConfirm: (fn: () => void) => void;
  closeSheet: SheetContext['close'];
}): SheetContext {
  const { props, id, closeSheet, setConfirm } = params;
  const { portal, entryId } = props;

  return {
    id: entryId ?? id,
    props,
    close: closeSheet,
    setConfirm,
    update: nextProps => entryId ? !!portal?.update(entryId, nextProps) : false,
  };
}
