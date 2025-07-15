import type { WindowControllerDefaultProps, CloseOptions } from '../../types';

export function closeWindow(params: {
  props: WindowControllerDefaultProps;
  onClosePortal: (e: any) => void;
  confirmClose?: (() => void) | null;
  setState: (state: Record<string, any>) => void;
  closeOptions?: CloseOptions;
}) {
  const { props, onClosePortal, confirmClose, setState, closeOptions = {} } = params;
  const { entryId, portalElement, portal, onClose, animLeaveTime } = props;
  const { id = entryId, isConfirmed } = closeOptions;

  if (!confirmClose || isConfirmed) {
    setState({ animationClass: 'windowLeave' });

    setTimeout(() => {
      portalElement.removeEventListener('close', onClosePortal);
      portal.remove(id);
      onClose();
    }, animLeaveTime / 2);
  } else {
    confirmClose();
  }
}