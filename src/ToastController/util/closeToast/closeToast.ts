import { TOAST_REMOVED_EVENT } from '../../constants';
import type { CloseOptions, ToastControllerDefaultProps, ToastControllerState } from '../../types';

export function closeToast(params: {
  props: ToastControllerDefaultProps;
  confirmClose?: (() => void) | null;
  state: ToastControllerState;
  toastRef: HTMLElement;
  observer: IntersectionObserver;
  closeOptions?: CloseOptions;
  reCalculateY: (e: any) => void;
  onClosePortal: (e: any) => void;
}) {
  const { props, confirmClose, state, closeOptions = {}, toastRef, observer, reCalculateY, onClosePortal } = params;
  const { portalElement, portal, entryId, onDestroy, onClose, animation } = props;
  const { id = entryId, isConfirmed } = closeOptions;


  if (!confirmClose || isConfirmed) {
    state.isOpen = false;
    observer.unobserve(toastRef);
    setTimeout(() => {
      portal.remove(id);

      portalElement.removeEventListener(TOAST_REMOVED_EVENT, reCalculateY);
      portalElement.dispatchEvent(new CustomEvent(TOAST_REMOVED_EVENT, {
        detail: { entryId: id },
      }));

      portalElement.removeEventListener('close', onClosePortal);
      onDestroy();
    }, (animation.out?.animationDuration || 1) * 1000);

    onClose();
  } else {
    confirmClose();
  }
}
