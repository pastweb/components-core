import type { WindowContext, WindowControllerDefaultProps } from '../../types';

export function getContext(params: {
  props: WindowControllerDefaultProps;
  setConfirm: (fn: () => void) => void,
  closeWindow: () => void;
  bringToFront: () => void;
  inject?: Record<string, any>;
}): WindowContext {
  const { props, closeWindow, bringToFront, setConfirm } = params;
  const { portal, entryId, mode, resizable, animation, closeOnBackdropClick } = props;

  return {
    id: entryId,
    props: {
      mode,
      resizable,
      animation,
      closeOnBackdropClick,
    },
    close: closeWindow,
    setConfirm,
    update: props => portal.update(entryId, props),
    bringToFront,
  };
}
