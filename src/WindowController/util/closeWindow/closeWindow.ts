import type { CloseOptions, WindowControllerDefaultProps, WindowControllerState } from '../../types';

export function closeWindow(params: {
  props: WindowControllerDefaultProps;
  onClosePortal: (e: any) => void;
  confirmClose?: (() => void) | null;
  state: WindowControllerState;
  closeOptions?: CloseOptions;
}) {
  const { props, onClosePortal, confirmClose, state, closeOptions = {} } = params;
  const { entryId, portalElement, portal, onClose, animation } = props;
  const { id = entryId, isConfirmed } = closeOptions;

  if (!confirmClose || isConfirmed) {
    state.isOpen = false;

    setTimeout(() => {
      portalElement.removeEventListener('close', onClosePortal);
      portal.remove(id);
      onClose();
    }, (animation.out?.animationDuration || 1) * 1000);
  } else {
    confirmClose();
  }
}
