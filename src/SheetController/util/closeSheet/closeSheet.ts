import type { CloseOptions, SheetControllerDefaultProps, SheetControllerState } from '../../types';

export function closeSheet(params: {
  props: SheetControllerDefaultProps;
  onClosePortal: (e: any) => void;
  confirmClose?: (() => void) | null;
  state: SheetControllerState;
  closeOptions?: CloseOptions;
}) {
  const { props, onClosePortal, confirmClose, state, closeOptions = {} } = params;
  const { entryId, portalElement, portal, onClose, animationTime } = props;
  const { id = entryId, isConfirmed } = closeOptions;

  if (!confirmClose || isConfirmed) {
    state.isOpen = false;

    setTimeout(() => {
      portalElement.removeEventListener('close', onClosePortal);
      portal.remove(id);
      onClose();
    }, animationTime / 2);
  } else {
    confirmClose();
  }
}
