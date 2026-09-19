import { reactive, noop } from '@pastweb/tools';
import {
  closeToast as _closeToast,
  getContext as _getContext,
  onClosePortal as _onClosePortal,
  onKeyDown as _onKeyDown,
  reCalculateY as _reCalculateY,
  calculateY,
  getToastIndex,
  initData,
  initState,
  onMounted as _onMounted,
  onMouseLeave as _onMouseLeave,
  onMouseOver as _onMouseOver,
  removeEscapeListener,
  resetTimer as _resetTimer,
  startTimer as _startTimer,
  stopTimer as _stopTimer,
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

  const stopTimer = () => _stopTimer(data);
  const resetTimer = () => _resetTimer(data);
  const startTimer = () => _startTimer({ props, data, setTime, stopTimer, closeToast });

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
    _onMouseOver({ props, data, resetTimer });
  }

  function onMouseLeave() {
    _onMouseLeave(props, startTimer);
  }

  function escapeListener(event: KeyboardEvent): void {
    onKeyDown(event);
  }

  function closeToast() {
    removeEscapeListener(escapeListener);
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

  function onMounted(toastElement: HTMLElement) {
    toastRef = toastElement;
    _onMounted({ data, toastElement, observer, reCalculateY, onClosePortal, escapeListener, getToastIndex });
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
