import type { CloseOptions, SheetControllerDefaultProps, SheetEvent } from '../../types';

/**
 * Listens for portal `close` events that target this sheet or every entry.
 *
 * @example
 * ```ts
 * const onPortalClose = onClosePortal(props, closeSheet);
 * ```
 */
export function onClosePortal(
  props: SheetControllerDefaultProps,
  closeSheet: (closeOptions?: CloseOptions) => void,
) {
  const { entryId } = props;

  return (event: SheetEvent) => {
    const eventEntryId = event.detail?.entryId;
    if (event.type === 'close' && (eventEntryId === '*' || eventEntryId === entryId)) {
      closeSheet();
    }
  };
}
