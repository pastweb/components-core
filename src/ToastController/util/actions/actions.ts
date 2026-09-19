import { TOAST_REMOVED_EVENT } from '../../constants';
import type { ToastControllerDefaultProps, ToastData } from '../../types';
import { calculateTime } from '../calculateTime';
import { stopTimer } from '../stopTimer';

/** Starts the toast countdown interval. */
export function startTimer(params: {
  props: ToastControllerDefaultProps;
  data: ToastData;
  setTime: (percent: number) => void;
  stopTimer: () => void;
  closeToast: () => void;
}): void {
  const { props, data, setTime, stopTimer, closeToast } = params;
  clearInterval(data.interval);
  data.interval = setInterval(calculateTime.bind(null, { props, data, setTime, stopTimer, closeToast }), props.timeUpdate);
}

/** Resets elapsed toast time. */
export function resetTimer(data: ToastData): void {
  data.time = 0;
}

/** Pauses and optionally resets the timer while the toast is hovered. */
export function onMouseOver(params: {
  props: ToastControllerDefaultProps;
  data: ToastData;
  resetTimer: () => void;
}): void {
  const { props, data, resetTimer: reset } = params;
  if (!props.pauseTimerOnOver) return;
  stopTimer(data);
  if (props.resetTimerOnPause) reset();
}

/** Resumes the timer after pointer leave when hover pausing is enabled. */
export function onMouseLeave(props: ToastControllerDefaultProps, startTimer: () => void): void {
  if (props.pauseTimerOnOver) startTimer();
}

/** Registers toast portal and keyboard listeners after the rendered element mounts. */
export function onMounted(params: {
  data: ToastData;
  toastElement: HTMLElement;
  observer: IntersectionObserver;
  reCalculateY: (event: Event) => void;
  onClosePortal: (event: Event) => void;
  escapeListener: (event: KeyboardEvent) => void;
  getToastIndex: (data: ToastData) => number;
}): void {
  const { data, toastElement, observer, reCalculateY, onClosePortal, escapeListener, getToastIndex } = params;
  data.toastIndex = getToastIndex(data);
  data.portalElement.addEventListener(TOAST_REMOVED_EVENT, reCalculateY);
  data.portalElement.addEventListener('close', onClosePortal);
  observer.observe(toastElement);
  document.removeEventListener('keydown', escapeListener);
  document.addEventListener('keydown', escapeListener);
}

/** Stops keyboard close handling before a toast is removed. */
export function removeEscapeListener(escapeListener: (event: KeyboardEvent) => void): void {
  document.removeEventListener('keydown', escapeListener);
}
