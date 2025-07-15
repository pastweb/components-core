import type { ParentWindow, WindowControllerDefaultProps } from '../../types';

export function getParentWindow(params: {
  props: WindowControllerDefaultProps;
  setConfirm: (fn: () => void) => void,
  closeWindow: () => void;
  bringToFront: () => void;
  inject?: Record<string, any>;
}): ParentWindow {
  const { props, closeWindow, bringToFront, setConfirm, inject = {} } = params;
  const { portal, entryId, mode, resizable, animLeaveTime, closeOnBackdropClick } = props;

  return {
    id: entryId,
    props: {
      mode,
      resizable,
      animLeaveTime,
      closeOnBackdropClick,
    },
    close: closeWindow,
    setConfirm,
    update: props => portal.update(entryId, props),
    bringToFront,
    inject,
  };
}
