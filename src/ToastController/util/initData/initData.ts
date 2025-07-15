import type { ToastControllerDefaultProps, ToastData } from '../../types';

export function initData(props: ToastControllerDefaultProps): ToastData {
  const { portalElement, entryId, delay } = props;

  return {
    portalElement,
    toastId: entryId,
    toastIndex: 0,
    time: 0,
    timeout: (delay as number) * 1000,
    interval: null,
  };
}
