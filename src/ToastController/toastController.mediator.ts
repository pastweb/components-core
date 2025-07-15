import { createState, noop } from '@pastweb/tools';
import { TOAST_REMOVED_EVENT } from './constants';
import {
  initState,
  initData,
  getToastIndex,
  calculateTime,
  calculateY,
  closeToast as _closeToast,
  reCalculateY as _reCalculateY,
  onClosePortal as _onClosePortal,
  getParentToast as _getParentToast,
  onKeyDown as _onKeyDown,
} from './util';
import type {
  ToastControllerDefaultProps,
  ToastControllerState,
  ToastControllerMediator,
} from './types';

export function toastController(props: ToastControllerDefaultProps): ToastControllerMediator {
  const { state, setState } = createState<ToastControllerState>(initState(props));

  const data = initData(props);
  let toastRef: HTMLElement | null = null;
  let setTime: (percent: number) => void = noop;
  let confirmClose: (() => void) | null = null;

  function startTimer() {
    data.interval = setInterval(() => calculateTime({
      props,
      data,
      setTime,
      stopTimer,
      closeToast,
    }), props.timeUpdate);
  }

  const stopTimer = () => { clearInterval(data.interval); };

  const resetTimer = () => { data.time = 0; };

  const observer = new IntersectionObserver(entries => {
    const [entry] = entries;

    if (entry.intersectionRatio < 1) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  const reCalculateY = _reCalculateY(data, () => calculateY(props, data, state, setState));

  const onClosePortal = _onClosePortal(data.toastId, closeToast);

  function closeToast() {
    _closeToast({
      props,
      confirmClose,
      setState,
      toastRef: toastRef as HTMLElement,
      observer,
      reCalculateY,
      onClosePortal,
    });
  }

  const onKeyDown = (e: any) => _onKeyDown(props, e, closeToast);

  function getParentToast(inject: Record<string, any> = {}) {
    return _getParentToast({
      props,
      data,
      closeToast,
      setConfirm: fn => confirmClose = fn,
      setTime: fn => setTime = fn,
      inject,
    });
  }

  function onMouseOver() {
    if (props.pauseTimerOnOver) {
      stopTimer();
      if (props.resetTimerOnPause) {
        resetTimer();
      }
    }
  }

  function onMouseLeave() {
    if (props.pauseTimerOnOver) {
      startTimer();
    }
  }

  function onMounted(toastElement: HTMLElement) {
    toastRef = toastElement;
    const { portalElement } = data;
    data.toastIndex = getToastIndex(data);
    portalElement.addEventListener(TOAST_REMOVED_EVENT, reCalculateY);
    portalElement.addEventListener('close', onClosePortal);
    observer.observe(toastRef);
  }

  return {
    state,
    data,
    getParentToast,
    onMouseOver,
    onMouseLeave,
    onMounted,
    onKeyDown,
  };
}
