import type { ToastControllerDefaultProps, ToastData } from '../../types';

export function calculateTime(params: {
  props: ToastControllerDefaultProps;
  data: ToastData;
  setTime: (percant: number) => void;
  stopTimer: () => void;
  closeToast: () => void;
}) {
  const { props, data, setTime, stopTimer, closeToast } = params;
  const { timeUpdate } = props;
  const { time, timeout } = data;

  if (time < timeout) {
    data.time += timeUpdate;
    const timePercent = data.time * 100 / timeout;
    setTime(timePercent);
  } else {
    stopTimer();
    closeToast();
  }
}
