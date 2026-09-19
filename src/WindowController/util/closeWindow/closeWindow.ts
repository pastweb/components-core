import type { CloseOptions, WindowControllerDefaultProps, WindowControllerState, WindowControllerVars } from '../../types';

export function closeWindow(params: {
  props: WindowControllerDefaultProps;
  onClosePortal: (e: any) => void;
  vars: WindowControllerVars;
  state: WindowControllerState;
  closeOptions?: CloseOptions;
}) {
  const { props, onClosePortal, vars, state, closeOptions = {} } = params;
  const { entryId, portalElement, portal, onClose, animation } = props;
  const { id = entryId, isConfirmed } = closeOptions;

  if (!vars.confirmClose || isConfirmed) {
    state.isOpen = false;

    setTimeout(() => {
      portalElement.removeEventListener('close', onClosePortal);
      portal.remove(id);
      onClose();
    }, (animation.out?.animationDuration || 1) * 1000);
  } else {
    vars.confirmClose();
  }
}
