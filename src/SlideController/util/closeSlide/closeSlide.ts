import type { SlideControllerDefaultProps, CloseOptions } from '../../types';

export function closeSlide(params: {
  props: SlideControllerDefaultProps;
  onClosePortal: (e: any) => void;
  confirmClose?: (() => void) | null;
  setState: (state: Record<string, any>) => void;
  closeOptions?: CloseOptions;
}) {
  const { props, onClosePortal, confirmClose, setState, closeOptions = {} } = params;
  const { entryId, portalElement, portal, onClose, animationTime } = props;
  const { id = entryId, isConfirmed } = closeOptions;

  if (!confirmClose || isConfirmed) {
    setState({ isOpen: false });

    setTimeout(() => {
      portalElement.removeEventListener('close', onClosePortal);
      portal.remove(id);
      onClose();
    }, animationTime / 2);
  } else {
    confirmClose();
  }
}