import type { SheetContext, SheetControllerDefaultProps } from '../../types';

export function getContext(params: {
  props: SheetControllerDefaultProps;
  setConfirm: (fn: () => void) => void,
  closeSheet: () => void;
  inject?: Record<string, any>;
}): SheetContext {
  const { props, closeSheet, setConfirm } = params;

  const {
    portal,
    entryId,

    backdrop,
    direction,
    height,
    width,
    top,
    bottom,
    left,
    right,
    animationTime,
    closeOnBackdropClick,
  } = props;

  return {
    id: entryId,
    props: {
      backdrop,
      direction,
      height,
      width,
      top,
      bottom,
      left,
      right,
      animationTime,
      closeOnBackdropClick,
    },
    close: closeSheet,
    setConfirm,
    update: props => portal.update(entryId, props),
  };
}
