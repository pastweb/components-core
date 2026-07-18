import { reactive, noop } from '@pastweb/tools';
import { TOAST_REMOVED_EVENT } from './constants';
import {
  closeToast as _closeToast,
  getContext as _getContext,
  onClosePortal as _onClosePortal,
  onKeyDown as _onKeyDown,
  reCalculateY as _reCalculateY,
  calculateTime,
  calculateY,
  getToastIndex,
  initData,
  initState,
} from './util';
import type {
  ToastControllerDefaultProps,
  ToastControllerMediator,
  ToastControllerState,
} from './types';

export function toastControllerMediator(props: ToastControllerDefaultProps): ToastControllerMediator {
  const state = reactive<ToastControllerState>(initState(props));

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

  const reCalculateY = _reCalculateY(data, () => calculateY(props, data, state));

  const onClosePortal = _onClosePortal(data.toastId, closeToast);

  function closeToast() {
    _closeToast({
      props,
      confirmClose,
      state,
      toastRef: toastRef as HTMLElement,
      observer,
      reCalculateY,
      onClosePortal,
    });
  }

  const onKeyDown = (e: any) => _onKeyDown(props, e, closeToast);

  function getContext() {
    return _getContext({
      props,
      data,
      closeToast,
      setConfirm: fn => confirmClose = fn,
      setTime: fn => setTime = fn,
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
    getContext,
    onMouseOver,
    onMouseLeave,
    onMounted,
    onKeyDown,
  };
}
