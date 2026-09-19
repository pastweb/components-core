import type { ManagedWindowState } from '@pastweb/tools';
import type { WindowContext, WindowControllerDefaultProps } from '../../types';

export function getContext(params: {
  props: WindowControllerDefaultProps;
  setConfirm: (fn: () => void) => void,
  closeWindow: () => void;
  bringToFront: (activate?: boolean) => void;
  hide: () => void;
  show: () => void;
  minimize: () => boolean;
  maximize: () => boolean;
  isActive: boolean;
  manager?: ManagedWindowState;
}): WindowContext {
  const { props, closeWindow, bringToFront, hide, show, minimize, maximize, isActive, setConfirm, manager } = params;
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
    hide,
    show,
    minimize,
    maximize,
    isActive,
    manager,
  };
}
