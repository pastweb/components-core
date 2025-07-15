import type { ParentToast, ToastControllerDefaultProps, ToastData } from '../../types';

export function getParentToast(params: {
  props: ToastControllerDefaultProps;
  data: ToastData
  closeToast: () => void;
  setConfirm: (fn: () => void) => void;
  setTime: (fn: (percent: number) => void) => void;
  inject?: Record<string, any>;
}): ParentToast {
  const { props, data, closeToast, setConfirm, setTime, inject = {} } = params;
  const { toastId } = data;
  const {
    portal,
    position,
    padding,
    timeUpdate,
    animation,
    animationDuration,
    closeOnEscKey,
    pauseTimerOnOver,
    resetTimerOnPause,
  } = props;

  return {
    toastId,
    props: {
      position,
      padding,
      timeUpdate,
      animation,
      animationDuration,
      closeOnEscKey,
      pauseTimerOnOver,
      resetTimerOnPause,
    },
    close: closeToast,
    update: props => portal.update(toastId, props),
    setConfirm,
    setTime,
    inject,
  };
}
