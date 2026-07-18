import type { ToastContext, ToastControllerDefaultProps, ToastData } from '../../types';

export function getContext(params: {
  props: ToastControllerDefaultProps;
  data: ToastData
  closeToast: () => void;
  setConfirm: (fn: () => void) => void;
  setTime: (fn: (percent: number) => void) => void;
  inject?: Record<string, any>;
}): ToastContext {
  const { props, data, closeToast, setConfirm, setTime } = params;
  const { toastId } = data;
  const {
    portal,
    placement,
    padding,
    timeUpdate,
    animation,
    closeOnEscKey,
    pauseTimerOnOver,
    resetTimerOnPause,
  } = props;

  return {
    toastId,
    props: {
      placement,
      padding,
      timeUpdate,
      animation,
      closeOnEscKey,
      pauseTimerOnOver,
      resetTimerOnPause,
    },
    close: closeToast,
    update: props => portal.update(toastId, props),
    setConfirm,
    setTime,
  };
}
