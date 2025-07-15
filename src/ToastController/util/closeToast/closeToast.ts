import { TOAST_REMOVED_EVENT } from '../../constants';
import type { ToastControllerDefaultProps, CloseOptions } from '../../types';

export function closeToast(params: {
  props: ToastControllerDefaultProps;
  confirmClose?: (() => void) | null;
  setState: (state: Record<string, any>) => void;
  toastRef: HTMLElement;
  observer: IntersectionObserver;
  closeOptions?: CloseOptions;
  reCalculateY: (e: any) => void;
  onClosePortal: (e: any) => void;
}) {
  const { props, confirmClose, setState, closeOptions = {}, toastRef, observer, reCalculateY, onClosePortal } = params;
  const { portalElement, portal, entryId, onDestroy, onClose, animationDuration } = props;
  const { id = entryId, isConfirmed } = closeOptions;


  if (!confirmClose || isConfirmed) {
    setState({ isOpen: false });
    observer.unobserve(toastRef);
    setTimeout(() => {
      portal.remove(id);

      portalElement.removeEventListener(TOAST_REMOVED_EVENT, reCalculateY);
      portalElement.dispatchEvent(new CustomEvent(TOAST_REMOVED_EVENT, {
        detail: { entryId: id },
      }));

      portalElement.removeEventListener('close', onClosePortal);
      onDestroy();
    }, animationDuration);

    onClose();
  } else {
    confirmClose();
  }
}
